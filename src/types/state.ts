import { FilmFullInfo, FilmShortInfo } from './film';
import type { UserData } from './user-data';

export type State = {
  films: FilmShortInfo[],
  maxPageNumber: number,
  currentFilm: FilmFullInfo | null,
  isLogin: boolean,
  user: UserData | null,
};
