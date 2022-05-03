import { ThunkActionResult } from '../types/actions';
import {
  setFilms,
  setCurrentFilm,
  setMaxPageNumber,
  updateFilms,
  updateUserFilms,
  setFoundFilms,
} from './actions';
import { FilmsResponse, SearchResponse } from '../types/responses';
import { FilmFullInfo, FilmInfo, FilmShortInfo } from '../types/film';

const adaptShortFilmInfoToClient = (filmInfo: FilmShortInfo): FilmInfo => {
  return {
    filmId: filmInfo.filmId,
    nameRu: filmInfo.nameRu,
    nameEn: filmInfo.nameRu,
    year: Number(filmInfo.year),
    filmLength: filmInfo.filmLength,
    countries: filmInfo.countries,
    genres: filmInfo.genres,
    rating: Number(filmInfo.rating),
    posterUrl: filmInfo.posterUrl,
    description: null,
  };
};

const adaptFullFilmInfoToClient = (filmInfo: FilmFullInfo): FilmInfo => {
  return {
    filmId: filmInfo.kinopoiskId,
    nameRu: filmInfo.nameRu,
    nameEn: filmInfo.nameRu,
    year: filmInfo.year,
    filmLength: filmInfo.filmLength || 0,
    countries: filmInfo.countries,
    genres: filmInfo.genres,
    rating: filmInfo.ratingKinopoisk || 0,
    posterUrl: filmInfo.posterUrl,
    description: filmInfo.description,
  };
};

const fetchStartPageOfFilmsAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<FilmsResponse>(`/top?type=TOP_250_BEST_FILMS&page=1`).then((response) => {
      dispatch(setFilms(response.data.films.map((film) => adaptShortFilmInfoToClient(film))));
      dispatch(setMaxPageNumber(response.data.pagesCount));
    });
  };

const fetchOtherPageOfFilmsAction =
  (currentPageCount: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api
      .get<FilmsResponse>(`/top?type=TOP_250_BEST_FILMS&page=${currentPageCount}`)
      .then((response) => {
        dispatch(updateFilms(response.data.films.map((film) => adaptShortFilmInfoToClient(film))));
      });
  };

const fetchSearchedFilmsAction =
  (filters: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<SearchResponse>(`?${filters}`).then((response) => {
      dispatch(
        setFoundFilms({
          total: response.data.total,
          totalPages: response.data.totalPages,
          items: response.data.items.map((film) => adaptFullFilmInfoToClient(film)),
        }),
      );
    });
  };

const fetchCurrentFilmAction =
  (filmId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api
      .get<FilmFullInfo>(`/${filmId}`)
      .then((response) => dispatch(setCurrentFilm(adaptFullFilmInfoToClient(response.data))));
  };

const fetchUserFilmsAction =
  (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api
      .get<FilmFullInfo>(`/${filmId}`)
      .then((response) => dispatch(updateUserFilms(adaptFullFilmInfoToClient(response.data))));
  };

export {
  fetchStartPageOfFilmsAction,
  fetchOtherPageOfFilmsAction,
  fetchCurrentFilmAction,
  fetchUserFilmsAction,
  fetchSearchedFilmsAction,
};
