export const enum AppRoutes {
  Main = '/',
  Login = '/login',
  FilmPage = '/film/:id',
  UserFilms = '/userFilms/:type',
  Search = '/search',
  SearchHistory = '/search/history',
}

export enum ContentType {
  topFilms = 'ТОП 250',
  watchList = 'К просмотру',
  history = 'История',
  favorites = 'Любимые',
}
