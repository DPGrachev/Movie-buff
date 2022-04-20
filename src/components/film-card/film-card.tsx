import { Film } from "../../types/film";

type Props = {
  film: Film;
}

function formateDuration (unformatted: string) {
  const [hour, min] = unformatted.split(':');
  return `${Number(hour)}ч ${Number(min)}мин`;
}

function FilmCard({film}: Props): JSX.Element {
  const {nameRu, year, posterUrlPreview, rating, filmLength, genres} = film;
  const countries = film.countries.map((elem) => elem.country).join(' ');
  const duration = formateDuration(filmLength);

  return (
    <article className="film-card">
      <h3 className="film-card__title">{nameRu}</h3>
      <p className="film-card__rating">{rating}</p>
      <p className="film-card__info">
        <span className="film-card__year">{year}</span>
        <span className="film-card__duration">{duration}</span>
        <span className="film-card__genre">{genres[0].genre}</span>
      </p>
      <img src={posterUrlPreview} alt="" className="film-card__poster" />
      <p className="film-card__description">
        {countries}
      </p>
      <div className="film-card__controls">
        <button
          className="film-card__controls-item film-card__controls-item--add-to-watchlist"
          type="button"
        >
          Add to watchlist
        </button>
        <button
          className="film-card__controls-item film-card__controls-item--mark-as-watched"
          type="button"
        >
          Mark as watched
        </button>
        <button
          className="film-card__controls-item film-card__controls-item--favorite"
          type="button"
        >
          Mark as favorite
        </button>
      </div>
    </article>
  );
}

export default FilmCard;
