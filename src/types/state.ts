import { FilmFullInfo, FilmShortInfo } from './film';

export type State = {
  films: FilmShortInfo[];
  maxPageNumber: number;
  currentFilm: FilmFullInfo | null;
};
