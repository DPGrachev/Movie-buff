import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FilmFullInfo, FilmInfo, FilmShortInfo } from '../types/film';
import {
  AdaptedFilmsResponse,
  AdaptedSearchResponse,
  FilmsResponse,
  SearchResponse,
} from '../types/responses';

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

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', process.env.REACT_APP_API_KEY as string);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopFilms: builder.query<AdaptedFilmsResponse, number>({
      query: (page) => `/top?type=TOP_250_BEST_FILMS&page=${page}`,
      transformResponse: (response: FilmsResponse) => {
        return {
          pagesCount: response.pagesCount,
          films: response.films.map((film) => adaptShortFilmInfoToClient(film)),
        };
      },
    }),
    getSearchedFilms: builder.query<AdaptedSearchResponse, string>({
      query: (userParams) => `?${userParams}`,
      transformResponse: (response: SearchResponse) => {
        return {
          total: response.total,
          totalPages: response.totalPages,
          items: response.items.map((film) => adaptFullFilmInfoToClient(film)),
        };
      },
    }),
    getCurrentFilm: builder.query<FilmInfo, string>({
      query: (filmId) => `/${filmId}`,
      transformResponse: (response: FilmFullInfo) => adaptFullFilmInfoToClient(response),
    }),
    getUserFilms: builder.query<FilmInfo[], number[]>({
      queryFn: async (filmsId, _queryApi, _extraOptions, fetchWithBQ) => {
        const results = await Promise.all(filmsId.map((id) => fetchWithBQ(`/${id}`)));
        const films = results.map((result) =>
          adaptFullFilmInfoToClient(result.data as FilmFullInfo),
        );
        return { data: films };
      },
    }),
  }),
});

export const {
  useGetTopFilmsQuery,
  useGetCurrentFilmQuery,
  useGetSearchedFilmsQuery,
  useGetUserFilmsQuery,
} = apiSlice;
