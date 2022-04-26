import { Routes, Route } from 'react-router-dom';
import FilmPage from '../film-page/film-page';
import MainLayout from '../main-layout/main-layout';
import MainPage from '../main-page/main-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/film/:id" element={<FilmPage />} />
      </Route>
    </Routes>
  );
}

export default App;
