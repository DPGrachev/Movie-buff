import { Routes, Route } from 'react-router-dom';
import MainLayout from '../main-layout/main-layout';
import MainPage from '../main-page/main-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
