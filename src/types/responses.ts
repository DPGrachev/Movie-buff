import { FilmFullInfo, FilmShortInfo } from './film';

export type FilmsResponse = {
  pagesCount: number;
  films: FilmShortInfo[];
};

export type SearchResponse = {
  total: number;
  totalPages: number;
  items: FilmFullInfo[];
};
