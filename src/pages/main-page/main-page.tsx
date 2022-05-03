import { ContentBoard, Navigation } from '../../components';

export function MainPage(): JSX.Element {
  return (
    <main className="main">
      <Navigation />
      <section className="films">
        <ContentBoard />
      </section>
    </main>
  );
}
