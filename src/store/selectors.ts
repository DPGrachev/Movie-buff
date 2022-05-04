import { ContentType } from '../const';
import { State } from '../types/state';

export const getContentType = (state: State): ContentType => state.USER.contentType;

export const getLoginStatus = (state: State): boolean => state.USER.isLogin;

export const getUser = (state: State) => state.USER.user;
