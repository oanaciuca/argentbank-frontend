import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/authApi';  
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
      const response = await login(email, password); 
      console.log("Login response:", JSON.stringify(response, null, 2)); 

      return response;  
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

      return { userName: newUserName };
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
      state.email = null;
      localStorage.removeItem('token');  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login fulfilled with payload:", JSON.stringify(action.payload, null, 2)); 
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userData = { 
          id: action.payload.userData.id,
          email: action.payload.email,
          firstName: action.payload.userData.firstName,
          lastName: action.payload.userData.lastName,
          userName: action.payload.userData.userName,
        };
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login rejected with payload:", JSON.stringify(action.payload, null, 2));
        state.loading = false;
        state.error = action.payload; 
      })

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
