import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

export function MainLayout(): JSX.Element {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  );
}
