import { configureStore } from '@reduxjs/toolkit';
import { storageMiddleware } from '../services/storageMiddleware';
import { apiSlice } from './api';
import { rootReducer } from './reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, storageMiddleware),
});
