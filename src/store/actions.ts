import { ActionType } from '../const';
import { createAction } from '@reduxjs/toolkit';
import { FilmFullInfo, FilmShortInfo } from '../types/film';
import { UserData } from '../types/user-data';

const setFilms = createAction(ActionType.setFilms, (films: FilmShortInfo[]) => ({
  payload: {
    films,
  },
}));

const updateFilms = createAction(ActionType.updateFilms, (films: FilmShortInfo[]) => ({
  payload: {
    films,
  },
}));

const setMaxPageNumber = createAction(ActionType.setMaxPageNumber, (number: number) => ({
  payload: {
    number,
  },
}));

const setCurrentFilm = createAction(ActionType.setCurrentFilm, (film: FilmFullInfo) => ({
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

export { setFilms, updateFilms, setMaxPageNumber, setCurrentFilm, login, logout };
