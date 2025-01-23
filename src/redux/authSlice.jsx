import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/authApi.jsx';
import usersData from '../data/usersData'; 
import { updateUserProfile } from '../api/userApi'; 


const initialState = {
  isAuthenticated: false,
  userData: null,
  email: null,
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await login(email, password); 
  const userData = usersData.find((user) => user.email === email); 
  if (!userData) {
    throw new Error('Utilisateur non trouvé'); 
  }

  const token = response.token;

  localStorage.setItem('token', token);

  return { ...userData, token }; 
});

export const updateUser = createAsyncThunk('auth/updateUser', async ({ newUserName, token }) => {
  const response = await updateUserProfile(newUserName, token);
  if (!response) {
    throw new Error('Impossible de mettre à jour le nom d\'utilisateur');
  }

  return response; 
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userData = null;
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
        console.log('Connexion réussie :', action.payload);
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userData = { ...action.payload, token: undefined }; 
        state.email = action.payload.email;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = { ...state.userData, userName: action.payload.userName, };
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
