import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './const';
import { PrivateRoute, MainLayout } from './components';
import {LoginPage, FilmPage, SearchPage, MainPage, UserFilmsPage} from './pages'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route path={AppRoutes.FilmPage} element={<FilmPage />} />
        <Route path={AppRoutes.Search} element={<SearchPage />} />
        <Route path={AppRoutes.UserFilms} element={<PrivateRoute />}>
          <Route index element={<UserFilmsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
