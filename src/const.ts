export const enum AppRoutes {
  Main = '/',
  Login = '/login',
  FilmPage = '/film/:id',
  UserFilms = '/userFilms/:type',
}

export const enum ActionType {
  setFilms = 'set-films',
  setUserFilms = 'set-user-films',
  updateUserFilms = 'update-user-films',
  setContentType = 'navigation/set-content-type',
  updateFilms = 'update-films',
  setMaxPageNumber = 'set-max-page-number',
  setCurrentFilm = 'set-current-film',
  login = 'login-form/login',
  logout = 'login-form/logout',
  updateUser = 'update-user',
}

export enum ContentType {
  topFilms = 'ТОП 250',
  watchList = 'К просмотру',
  history = 'История',
  favorites = 'Любимые',
}
