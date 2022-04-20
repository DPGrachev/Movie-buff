import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

function MainLayout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
