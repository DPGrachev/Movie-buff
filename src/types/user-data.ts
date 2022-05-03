export type UserData = {
  readonly email: string;
  readonly password: string;
  favorites: number[];
  history: number[];
  watchlist: number[];
};

export type UserFavouritesType = 'watchlist' | 'history' | 'favorites';
