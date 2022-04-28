import { FilmFullInfo, FilmShortInfo } from '../types/film';
import { State } from '../types/state';

export const getFilms = (state: State): FilmShortInfo[] => state.films;

export const getMaxPageNumber = (state: State): number => state.maxPageNumber;

export const getCurrentFilm = (state: State): FilmFullInfo | null => state.currentFilm;

export const getLoginStatus = (state: State): boolean => state.isLogin;

export const getUser = (state: State) => state.user;
