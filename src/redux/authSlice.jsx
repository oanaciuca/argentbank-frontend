import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from "../api/authApi.jsx"; 

const initialState = {
    isAuthenticated: false,
    userData: null,
    token: null,
    loading: false,
    error: null,
  };

  export const loginUser = createAsyncThunk(
    'auth/login', 
    async ({ email, password }) => {
      const userData = await login(email, password);
      return userData; 
    }
  );


const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userData = null;
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
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userData = action.payload.userData;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
