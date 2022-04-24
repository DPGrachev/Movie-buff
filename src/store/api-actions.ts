import { ThunkActionResult } from '../types/actions';
import { setFilms, setCurrentFilm, setMaxPageNumber, updateFilms } from './actions';
import { FilmsResponse } from '../types/responses';
import { FilmFullInfo } from '../types/film';

const fetchStartPageOfFilmsAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<FilmsResponse>(`top?type=TOP_250_BEST_FILMS&page=1`).then((response) => {
      dispatch(setFilms(response.data.films));
      dispatch(setMaxPageNumber(response.data.pagesCount));
    });
  };

const fetchOtherPageOfFilmsAction =
  (currentPageCount: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api
      .get<FilmsResponse>(`top?type=TOP_250_BEST_FILMS&page=${currentPageCount}`)
      .then((response) => {
        dispatch(updateFilms(response.data.films));
      });
  };

const fetchCurrentFilmAction =
  (filmId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api
      .get<FilmFullInfo>(`${filmId}`)
      .then((response) => dispatch(setCurrentFilm(response.data)));
  };

export { fetchStartPageOfFilmsAction, fetchOtherPageOfFilmsAction, fetchCurrentFilmAction };
