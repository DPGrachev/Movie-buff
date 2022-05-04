import { FilmFullInfo, FilmInfo, FilmShortInfo } from './film';

export type FilmsResponse = {
  pagesCount: number;
  films: FilmShortInfo[];
};

export type AdaptedFilmsResponse = {
  pagesCount: number;
  films: FilmInfo[];
};

export type SearchResponse = {
  total: number;
  totalPages: number;
  items: FilmFullInfo[];
};

export type AdaptedSearchResponse = {
  total: number;
  totalPages: number;
  items: FilmInfo[];
};
