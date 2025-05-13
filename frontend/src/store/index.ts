import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { goodsApi } from '../api/goodsApi';
import { authApi } from '../api/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [goodsApi.reducerPath]: goodsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goodsApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;