import { QueryParams } from './search';

export type UserData = {
  readonly email: string;
  readonly password: string;
  favorites: number[];
  history: number[];
  watchlist: number[];
  searchHistory: QueryParams[];
};

export type UserFavouritesType = 'watchlist' | 'history' | 'favorites';
