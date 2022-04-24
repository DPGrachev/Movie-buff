import { createReducer } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { setCurrentFilm, setFilms, setMaxPageNumber, updateFilms } from './actions';

const initialState: State = {
  films: [],
  maxPageNumber: 0,
  currentFilm: null,
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilms, (state, action) => {
      state.films = action.payload.films;
    })
    .addCase(updateFilms, (state, action) => {
      state.films = state.films.concat(action.payload.films);
    })
    .addCase(setMaxPageNumber, (state, action) => {
      state.maxPageNumber = action.payload.number;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload.film;
    });
});

export { rootReducer };