import { useEffect, useState } from 'react';
import { FilmsResponse } from '../../types/responses';
import { FilmShortInfo } from '../../types/film';
import FilmCard from '../film-card/film-card';

function ContentBoard(): JSX.Element {
  const [filmCards, setFilmCards] = useState<FilmShortInfo[]>([]);
  const [currentPageCount, setCurrentPageCount] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(0);

  const preparedFilmCards = filmCards.map((film) => <FilmCard film={film} key={film.filmId} />);

  useEffect(() => {
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${currentPageCount}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': '61bb7a97-7cb8-418b-a9e0-a9c0a84911b8',
          'Content-Type': 'application/json',
        },
      },
    )
      .then<FilmsResponse>((res) => res.json())
      .then((res) =>
        setFilmCards((prevState) => {
          setMaxPageNumber(res.pagesCount);
          if (prevState.length > 0 && prevState[0].filmId === res.films[0].filmId) {
            return prevState;
          }
          return prevState.concat(res.films);
        }),
      );
  }, [currentPageCount]);

  function onShowMoreButtonClick() {
    setCurrentPageCount(currentPageCount + 1);
  }

  return (
    <section className="films-list">
      <div className="films-list__container">
        {preparedFilmCards.length > 0 && preparedFilmCards}
      </div>

      {currentPageCount !== maxPageNumber && (
        <button className="films-list__show-more" onClick={onShowMoreButtonClick}>
          Показать больше
        </button>
      )}
    </section>
  );
}

export default ContentBoard;
