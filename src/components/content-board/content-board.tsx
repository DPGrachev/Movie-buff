import FilmCard from '../film-card/film-card';

function ContentBoard(): JSX.Element {
  const filmCards = new Array(5).fill('').map(() => <FilmCard />);

  return (
    <section className="films-list">
      <h2 className="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div className="films-list__container">{filmCards}</div>

      <button className="films-list__show-more">Show more</button>
    </section>
  );
}

export default ContentBoard;
