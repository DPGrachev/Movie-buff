import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
// import { updateUser } from '../../store/actions';
import { getUser } from '../../store/selectors';
import { updateUser } from '../../store/user-data/user-data';
import { FilmInfo } from '../../types/film';
import { UserData, UserFavouritesType } from '../../types/user-data';

type Props = {
  film: FilmInfo;
};

function formateDuration(duration: string | number) {
  if (typeof duration === 'string') {
    const [hour, min] = duration.split(':');
    return `${Number(hour)}ч ${Number(min)}мин`;
  }
  return `${Math.floor(duration / 60)}ч ${duration % 60}мин`;
}

export function FilmCard({ film }: Props): JSX.Element {
  const { nameRu, year, posterUrl, rating, filmLength, genres, filmId } = film;
  const countries = film.countries.map((elem) => elem.country).join(' ');
  const duration = filmLength ? formateDuration(filmLength) : '';
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function onButtonClick(evt: MouseEvent<HTMLButtonElement>) {
    if (!user) {
      navigate(AppRoutes.Login);
      return;
    }

    let newUserData: UserData;
    let type = evt.currentTarget.dataset.type as UserFavouritesType;

    if (user[type].includes(filmId)) {
      newUserData = { ...user, [type]: user[type].filter((id) => id !== filmId) };
    } else {
      newUserData = { ...user, [type]: user[type].concat(filmId) };
    }

    dispatch(updateUser(newUserData));
  }

  return (
    <article className="film-card">
      <h3 className="film-card__title">{nameRu}</h3>
      <p className="film-card__rating">{rating}</p>
      <p className="film-card__info">
        <span className="film-card__year">{year}</span>
        <span className="film-card__duration">{duration}</span>
        <span className="film-card__genre">{genres[0].genre}</span>
      </p>
      <Link to={`/film/${filmId}`}>
        <img src={posterUrl} alt="" className="film-card__poster" />
      </Link>
      <p className="film-card__description">{countries}</p>
      <div className="film-card__controls">
        <button
          className={`film-card__controls-item film-card__controls-item--add-to-watchlist ${
            user?.watchlist.includes(filmId) ? 'film-card__controls-item--active' : ''
          }`}
          type="button"
          data-type="watchlist"
          onClick={onButtonClick}
        >
          Add to watchlist
        </button>
        <button
          className={`film-card__controls-item film-card__controls-item--mark-as-watched ${
            user?.history.includes(filmId) ? 'film-card__controls-item--active' : ''
          }`}
          type="button"
          data-type="history"
          onClick={onButtonClick}
        >
          Mark as watched
        </button>
        <button
          className={`film-card__controls-item film-card__controls-item--favorite ${
            user?.favorites.includes(filmId) ? 'film-card__controls-item--active' : ''
          }`}
          type="button"
          data-type="favorites"
          onClick={onButtonClick}
        >
          Mark as favorite
        </button>
      </div>
    </article>
  );
}
