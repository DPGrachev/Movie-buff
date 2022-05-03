import { createReducer } from '@reduxjs/toolkit';
import { ContentType } from '../const';
import storage from '../services/storage';
import { State } from '../types/state';
import {
  clearFoundFilms,
  login,
  logout,
  setContentType,
  setCurrentFilm,
  setFilms,
  setFoundFilms,
  setMaxPageNumber,
  setUserFilms,
  updateFilms,
  updateUser,
  updateUserFilms,
} from './actions';

const initialState: State = {
  films: [],
  userFilms: [],
  foundFilms: {
    total: 0,
    totalPages: 0,
    items: [],
  },
  contentType: ContentType.topFilms,
  maxPageNumber: 0,
  currentFilm: null,
  isLogin: false,
  user: null,
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilms, (state, action) => {
      state.films = action.payload.films;
    })
    .addCase(setFoundFilms, (state, action) => {
      state.foundFilms = action.payload.films;
    })
    .addCase(clearFoundFilms, (state) => {
      state.foundFilms = initialState.foundFilms;
    })
    .addCase(setUserFilms, (state, action) => {
      state.userFilms = action.payload.films;
    })
    .addCase(updateUserFilms, (state, action) => {
      state.userFilms = state.userFilms.concat(action.payload.film);
    })
    .addCase(setContentType, (state, action) => {
      state.contentType = action.payload.contentType;
    })
    .addCase(updateFilms, (state, action) => {
      state.films = state.films.concat(action.payload.films);
    })
    .addCase(setMaxPageNumber, (state, action) => {
      state.maxPageNumber = action.payload.number;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload.film;
    })
    .addCase(login, (state, action) => {
      state.isLogin = true;
      state.user = action.payload.user;
    })
    .addCase(logout, (state) => {
      state.isLogin = false;
      state.user = null;
    })
    .addCase(updateUser, (state, action) => {
      storage.updateUser(action.payload.user);
      state.user = action.payload.user;
    });
});

export { rootReducer };
