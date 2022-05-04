import { MiddlewareAPI, Dispatch } from 'redux';
import storage from './storage';

/**
  При входе пользователя или его регистрации данная Middleware проверяет localStorage на наличие необходимой для дальнейших действий информации.
 */

export const storageMiddleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
  if (action.type === 'userData/login') {
    const user = storage.getUser(action.payload.userEmail, action.payload.userPassword);
    action.payload = user;
    return next(action);
  }

  if (action.type === 'userData/registration') {
    storage.setUser(action.payload);
  }

  return next(action);
};
