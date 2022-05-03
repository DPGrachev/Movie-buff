import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

export function MainLayout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
