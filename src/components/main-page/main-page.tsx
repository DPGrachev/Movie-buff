import ContentBoard from '../content-board/content-board';
import Navigation from '../navigation/navigation';
import Sort from '../sort/sort';

function MainPage(): JSX.Element {
  return (
    <main className="main">
      <Navigation />
      <Sort />
      <section className="films">
        <ContentBoard />
      </section>
    </main>
  );
}

export default MainPage;
