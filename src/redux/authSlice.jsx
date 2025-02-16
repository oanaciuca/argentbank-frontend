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
      
      // Appel à l'API GET pour récupérer le profil utilisateur complet
      const profileResponse = await getUserProfile();
      
      // On retourne le token et les données utilisateur complètes 
      return { token: loginResponse.token, userData: profileResponse };
    } catch (error) {
      return rejectWithValue(error.message);  
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ newUserName }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');    
    if (!token) {
      return rejectWithValue('Token absent');
    }

    try {
      await updateUserProfile(newUserName);
      
      // Appel à l'API GET pour récupérer le profil mis à jour
      const profileResponse = await getUserProfile();
      
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
        if (action.payload && action.payload.userName) {
          state.userData.userName = action.payload.userName;
        }
        state.loading = false;
      })
        
      .addCase(updateUser.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload;  
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
