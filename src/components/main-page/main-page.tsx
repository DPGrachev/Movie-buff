import ContentBoard from '../content-board/content-board';
import Navigation from '../navigation/navigation';

function MainPage(): JSX.Element {
  return (
    <main className="main">
      <Navigation />
      <section className="films">
        <ContentBoard />
      </section>
    </main>
  );
}

export default MainPage;
