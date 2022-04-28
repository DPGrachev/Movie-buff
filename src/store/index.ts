import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { rootReducer } from './reducer';

const api = createAPI();

console.log(api);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
