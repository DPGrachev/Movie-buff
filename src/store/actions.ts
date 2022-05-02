import { ActionType, ContentType } from '../const';
import { createAction } from '@reduxjs/toolkit';
import { FilmInfo } from '../types/film';
import { UserData } from '../types/user-data';

const setFilms = createAction(ActionType.setFilms, (films: FilmInfo[]) => ({
  payload: {
    films,
  },
}));

const setUserFilms = createAction(ActionType.setUserFilms, (films: FilmInfo[]) => ({
  payload: {
    films,
  },
}));

const updateUserFilms = createAction(ActionType.updateUserFilms, (film: FilmInfo) => ({
  payload: {
    film,
  },
}));

const setContentType = createAction(ActionType.setContentType, (contentType: ContentType) => ({
  payload: {
    contentType,
  },
}));

const updateFilms = createAction(ActionType.updateFilms, (films: FilmInfo[]) => ({
  payload: {
    films,
  },
}));

const setMaxPageNumber = createAction(ActionType.setMaxPageNumber, (number: number) => ({
  payload: {
    number,
  },
}));

const setCurrentFilm = createAction(ActionType.setCurrentFilm, (film: FilmInfo) => ({
  payload: {
    film,
  },
}));

const login = createAction(ActionType.login, (user: UserData) => ({
  payload: {
    user,
  },
}));

const logout = createAction(ActionType.logout);

const updateUser = createAction(ActionType.updateUser, (user: UserData) => ({
  payload: {
    user,
  },
}));

export {
  setFilms,
  setContentType,
  updateFilms,
  setMaxPageNumber,
  setCurrentFilm,
  login,
  logout,
  updateUser,
  setUserFilms,
  updateUserFilms,
};
