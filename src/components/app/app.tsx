import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import FilmPage from '../film-page/film-page';
import { LoginForm } from '../login-form/login-form';
import MainLayout from '../main-layout/main-layout';
import MainPage from '../main-page/main-page';
import { PrivateRoute } from '../private-route/private-route';
import UserFilmsPage from '../user-films-page/user-films-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path={AppRoutes.Login} element={<LoginForm />} />
        <Route path={AppRoutes.FilmPage} element={<FilmPage />} />
        <Route path={AppRoutes.UserFilms} element={<PrivateRoute />}>
          <Route index element={<UserFilmsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
