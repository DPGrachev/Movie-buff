import { ContentType } from '../const';
import { FilmInfo } from '../types/film';
import { State } from '../types/state';

export const getFilms = (state: State): FilmInfo[] => state.films;

export const getUserFilms = (state: State): FilmInfo[] => state.userFilms;

export const getContentType = (state: State): ContentType => state.contentType;

export const getMaxPageNumber = (state: State): number => state.maxPageNumber;

export const getCurrentFilm = (state: State): FilmInfo | null => state.currentFilm;

export const getLoginStatus = (state: State): boolean => state.isLogin;

export const getUser = (state: State) => state.user;
