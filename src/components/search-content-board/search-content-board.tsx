import {FilmCard} from '../film-card/film-card';
import type { FoundFilms } from '../../types/state';

type Props = {
  films: FoundFilms;
};

export function SearchContentBoard({ films }: Props): JSX.Element {
  const preparedFilmCards = films.items.map((film) => <FilmCard film={film} key={film.filmId} />);

  return (
    <section className="films-list">
      <p>Найдено фильмов: {films.total}</p>
      <div className="films-list__container">
        {preparedFilmCards.length > 0 && preparedFilmCards}
      </div>
    </section>
  );
}
