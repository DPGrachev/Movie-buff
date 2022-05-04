import { ContentType } from '../const';
import { FilmInfo } from './film';
import type { UserData } from './user-data';

export type State = {
  USER: UserState;
};

export type UserState = {
  isLogin: boolean;
  user: UserData | null;
  contentType: ContentType;
};

export type FoundFilms = {
  total: number;
  totalPages: number;
  items: FilmInfo[];
};
