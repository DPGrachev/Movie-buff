import { ContentType } from '../const';
import { FilmInfo } from './film';
import type { UserData } from './user-data';

export type State = {
  films: FilmInfo[],
  userFilms: FilmInfo[],
  contentType: ContentType,
  maxPageNumber: number,
  currentFilm: FilmInfo | null,
  isLogin: boolean,
  user: UserData | null,
};
