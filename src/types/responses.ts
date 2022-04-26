import { FilmShortInfo } from './film';

export type FilmsResponse = {
  pagesCount: number;
  films: FilmShortInfo[];
};
