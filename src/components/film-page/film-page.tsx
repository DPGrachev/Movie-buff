import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FilmFullInfo } from '../../types/film';
import Navigation from '../navigation/navigation';

function formateDuration(duration: number) {
  return `${Math.floor(duration / 60)}ч ${duration % 60}мин`;
}

function FilmPage(): JSX.Element {
  const params = useParams();
  const [currentFilm, setCurrentFilm] = useState<FilmFullInfo>();

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

  useEffect(() => {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${params.id}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': '61bb7a97-7cb8-418b-a9e0-a9c0a84911b8',
        'Content-Type': 'application/json',
      },
    })
      .then<FilmFullInfo>((res) => res.json())
      .then((res) => setCurrentFilm(res));
  }, [params.id]);

  return (
    <main className="main">
      <Navigation />
      {!currentFilm && <h1>Загрузка...</h1>}
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
                    <p className="film-details__title-original">
                      Оригинал: {currentFilm.nameOriginal}
                    </p>
                  </div>

                  <div className="film-details__rating">
                    <p className="film-details__total-rating">{currentFilm.ratingKinopoisk}</p>
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
