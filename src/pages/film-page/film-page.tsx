import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '../../components';
import { AppRoutes } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useGetCurrentFilmQuery } from '../../store/api';
import { getUser } from '../../store/selectors';
import { updateUser } from '../../store/user-data/user-data';
import { UserData, UserFavouritesType } from '../../types/user-data';

type Params = {
  id: string;
};

function formateDuration(duration: number) {
  return `${Math.floor(duration / 60)}ч ${duration % 60}мин`;
}

export function FilmPage(): JSX.Element {
  const params = useParams<Params>();
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetCurrentFilmQuery(params.id as string);
  const currentFilm = data;
  const duration = currentFilm ? formateDuration(currentFilm.filmLength as number) : 0;
  const countries = currentFilm?.countries.map((country) => (
    <span key={country.country} className="film-details__genre">
      {country.country}
    </span>
  ));
  const genres = currentFilm?.genres.map((genre) => (
    <span key={genre.genre} className="film-details__genre">
      {genre.genre}
    </span>
  ));

  function onButtonClick(evt: MouseEvent<HTMLButtonElement>) {
    if (!user) {
      navigate(AppRoutes.Login);
      return;
    }

    let newUserData: UserData;
    let type = evt.currentTarget.dataset.type as UserFavouritesType;

    if (user[type].includes(currentFilm?.filmId as number)) {
      newUserData = { ...user, [type]: user[type].filter((id) => id !== currentFilm?.filmId) };
    } else {
      newUserData = { ...user, [type]: user[type].concat(currentFilm?.filmId as number) };
    }

    dispatch(updateUser(newUserData));
  }

  return (
    <main className="main">
      <Navigation />
      {isLoading && <h1>Загрузка...</h1>}
      {currentFilm && (
        <section>
          <div className="film-details__top-container">
            <div className="film-details__info-wrap">
              <div className="film-details__poster">
                <img className="film-details__poster-img" src={currentFilm.posterUrl} alt="" />

                <p className="film-details__age">18+</p>
              </div>

              <div className="film-details__info">
                <div className="film-details__info-head">
                  <div className="film-details__title-wrap">
                    <h3 className="film-details__title">{currentFilm.nameRu}</h3>
                    <p className="film-details__title-original">Оригинал: {currentFilm.nameEn}</p>
                  </div>

                  <div className="film-details__rating">
                    <p className="film-details__total-rating">{currentFilm.rating}</p>
                  </div>
                </div>

                <table className="film-details__table">
                  <tbody>
                    <tr className="film-details__row">
                      <td className="film-details__term">Год релиза</td>
                      <td className="film-details__cell">{currentFilm.year}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="film-details__row">
                      <td className="film-details__term">Продолжительность</td>
                      <td className="film-details__cell">{duration}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="film-details__row">
                      <td className="film-details__term">Страна</td>
                      <td className="film-details__cell">{countries}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="film-details__row">
                      <td className="film-details__term">Жанры</td>
                      <td className="film-details__cell">{genres}</td>
                    </tr>
                  </tbody>
                </table>

                <p className="film-details__film-description">{currentFilm.description}</p>
              </div>
            </div>

            <section className="film-details__controls">
              <button
                type="button"
                className={`film-details__control-button film-details__control-button--watchlist ${
                  user?.watchlist.includes(currentFilm.filmId)
                    ? 'film-details__control-button--active'
                    : ''
                }`}
                id="watchlist"
                name="watchlist"
                data-type="watchlist"
                onClick={onButtonClick}
              >
                Хочу посмотреть
              </button>
              <button
                type="button"
                className={`film-details__control-button film-details__control-button--watched ${
                  user?.history.includes(currentFilm.filmId)
                    ? 'film-details__control-button--active'
                    : ''
                }`}
                id="watched"
                name="watched"
                data-type="history"
                onClick={onButtonClick}
              >
                Уже видел
              </button>
              <button
                type="button"
                className={`film-details__control-button film-details__control-button--favorite ${
                  user?.favorites.includes(currentFilm.filmId)
                    ? 'film-details__control-button--active'
                    : ''
                }`}
                id="favorite"
                name="favorite"
                data-type="favorites"
                onClick={onButtonClick}
              >
                {' '}
                В избранное
              </button>
            </section>
          </div>
        </section>
      )}
    </main>
  );
}
