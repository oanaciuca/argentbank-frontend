import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/authApi';  
import { getUserProfile } from '../api/getUserProfile'; 
import { updateUserProfile } from '../api/userApi';

const initialState = {
  isAuthenticated: false,
  userData: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
  },
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Appel à l'API POST pour obtenir le token
      const loginResponse = await login(email, password); 
      console.log("Login response:", JSON.stringify(loginResponse, null, 2)); 
      
      // Appel à l'API GET pour récupérer le profil utilisateur complet
      const profileResponse = await getUserProfile();
      console.log("Profile response:", JSON.stringify(profileResponse, null, 2));
      
      // On retourne le token et les données utilisateur complètes (situées dans "body")
      return { token: loginResponse.token, userData: profileResponse };
    } catch (error) {
      console.error("Erreur dans loginUser:", error); 
      return rejectWithValue(error.message);  
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ newUserName }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');  
    console.log("Token dans updateUser : ", token);  
    if (!token) {
      return rejectWithValue('Token absent');
    }

    try {
      await updateUserProfile(newUserName);
      console.log("Réponse de updateUserProfile: Mise à jour réussie");
      
      // Appel à l'API GET pour récupérer le profil mis à jour
      const profileResponse = await getUserProfile();
      console.log("Profile response après update:", JSON.stringify(profileResponse, null, 2));
      
      // Retourne le nouveau userName extrait de la propriété "body"
      return { userName: profileResponse.body.userName };
    } catch (error) {
      console.error("Erreur dans updateUser thunk:", error);
      return rejectWithValue(error.message);  
    } 
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userData = {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
      };
      state.error = null;
      localStorage.removeItem('token');  
    },
  },
  extraReducers: (builder) => {
    // Gestion du login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login fulfilled with payload:", JSON.stringify(action.payload, null, 2));
        state.isAuthenticated = true;
        state.token = action.payload.token;
        // On extrait les données utilisateur depuis "body"
        state.userData = { 
          id: action.payload.userData.body.id,
          email: action.payload.userData.body.email,
          firstName: action.payload.userData.body.firstName,
          lastName: action.payload.userData.body.lastName,
          userName: action.payload.userData.body.userName,
        };
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login rejected with payload:", JSON.stringify(action.payload, null, 2));
        state.loading = false;
        state.error = action.payload; 
      })

      // Gestion de la mise à jour du username
      .addCase(updateUser.pending, (state) => {
        console.log("UpdateUser pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("UpdateUser fulfilled with payload:", JSON.stringify(action.payload, null, 2));
        if (action.payload && action.payload.userName) {
          state.userData.userName = action.payload.userName;
          console.log("userData mis à jour:", JSON.stringify(state.userData, null, 2));
        } else {
          console.warn("Action payload ne contient pas userName:", JSON.stringify(action.payload, null, 2));
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log("UpdateUser rejected with payload:", JSON.stringify(action.payload, null, 2)); 
        state.loading = false;
        state.error = action.payload;  
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
