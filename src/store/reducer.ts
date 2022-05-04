import { combineReducers } from '@reduxjs/toolkit';
import userData from './user-data/user-data';
import { apiSlice } from './api';

const rootReducer = combineReducers({
  USER: userData,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export { rootReducer };
