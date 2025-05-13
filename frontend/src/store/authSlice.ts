import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    access_token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log('Storing credentials:', action.payload);
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      localStorage.setItem('token', action.payload.access_token);
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;