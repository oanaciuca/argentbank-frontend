import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../api/userApi';  

const initialState = {
  isAuthenticated: false,
  userData: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userData = { email: action.payload.email };  
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userData = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;  
    },
  },
});


export const fetchUserData = (token) => async (dispatch) => {
  const userProfile = await fetchUserProfile(token);
  if (userProfile) {
    dispatch(setUserData(userProfile)); 
  }
};

export const { loginUser, logoutUser, setUserData } = authSlice.actions;

export default authSlice.reducer;
