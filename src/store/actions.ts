import { ActionType } from '../const';
import { createAction } from '@reduxjs/toolkit';
import { FilmFullInfo, FilmShortInfo } from '../types/film';

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

export { setFilms, updateFilms, setMaxPageNumber, setCurrentFilm };
