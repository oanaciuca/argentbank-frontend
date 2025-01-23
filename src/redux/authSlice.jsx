import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/authApi.jsx';
import usersData from '../data/usersData'; // Importer les données utilisateur
import { updateUserProfile } from '../api/userApi'; // Requête PUT


const initialState = {
  isAuthenticated: false,
  userData: null,
  email: null,
  token: null,
  loading: false,
  error: null,
};

// AsyncThunk pour la connexion utilisateur
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await login(email, password); // Appel API pour obtenir le token
  const userData = usersData.find((user) => user.email === email); // Recherche des données utilisateur
  if (!userData) {
    throw new Error('Utilisateur non trouvé'); // Rejeter si l'utilisateur n'est pas trouvé
  }

  const token = response.token;

  // Sauvegarder le token dans localStorage
  localStorage.setItem('token', token);

  return { ...userData, token }; // Combiner les données utilisateur et le token
});

// AsyncThunk pour la mise à jour du profil utilisateur
export const updateUser = createAsyncThunk('auth/updateUser', async ({ newUserName, token }) => {
  const response = await updateUserProfile(newUserName, token);
  if (!response) {
    throw new Error('Impossible de mettre à jour le nom d\'utilisateur');
  }

  return response; // Retourner la réponse (nouvelles données utilisateur)
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
        state.userData = { ...action.payload, token: undefined }; // Exclure le token des données utilisateur
        state.email = action.payload.email;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       // Gestion de la mise à jour du profil
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // Mettre à jour les données utilisateur avec la réponse de l'API
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
