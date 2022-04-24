import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCurrentFilmAction } from '../../store/api-actions';
import { getCurrentFilm } from '../../store/selectors';
import Navigation from '../navigation/navigation';

type Params = {
  id: string;
};

function formateDuration(duration: number) {
  return `${Math.floor(duration / 60)}ч ${duration % 60}мин`;
}

function FilmPage(): JSX.Element {
  const params = useParams<Params>();
  const dispatch = useDispatch();
  const currentFilm = useSelector(getCurrentFilm);

  const duration = currentFilm ? formateDuration(currentFilm.filmLength) : 0;
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
  const isCurrentFilm = currentFilm && currentFilm.kinopoiskId === Number(params.id) ? true : false;

  useEffect(() => {
    if (!currentFilm || currentFilm.kinopoiskId !== Number(params.id)) {
      dispatch<any>(fetchCurrentFilmAction(params.id as string));
    }
  }, [params.id, currentFilm, dispatch]);

  return (
    <main className="main">
      <Navigation />
      {!isCurrentFilm && <h1>Загрузка...</h1>}
      {isCurrentFilm && (
        <section>
          <div className="film-details__top-container">
            <div className="film-details__info-wrap">
              <div className="film-details__poster">
                <img className="film-details__poster-img" src={currentFilm?.posterUrl} alt="" />

                <p className="film-details__age">18+</p>
              </div>

              <div className="film-details__info">
                <div className="film-details__info-head">
                  <div className="film-details__title-wrap">
                    <h3 className="film-details__title">{currentFilm?.nameRu}</h3>
                    <p className="film-details__title-original">
                      Оригинал: {currentFilm?.nameOriginal}
                    </p>
                  </div>

                  <div className="film-details__rating">
                    <p className="film-details__total-rating">{currentFilm?.ratingKinopoisk}</p>
                  </div>
                </div>

                <table className="film-details__table">
                  <tbody>
                    <tr className="film-details__row">
                      <td className="film-details__term">Год релиза</td>
                      <td className="film-details__cell">{currentFilm?.year}</td>
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

                <p className="film-details__film-description">{currentFilm?.description}</p>
              </div>
            </div>

            <section className="film-details__controls">
              <button
                type="button"
                className="film-details__control-button film-details__control-button--active film-details__control-button--watchlist"
                id="watchlist"
                name="watchlist"
              >
                Хочу посмотреть
              </button>
              <button
                type="button"
                className="film-details__control-button film-details__control-button--watched"
                id="watched"
                name="watched"
              >
                Уже видел
              </button>
              <button
                type="button"
                className="film-details__control-button film-details__control-button--favorite"
                id="favorite"
                name="favorite"
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

export default FilmPage;
