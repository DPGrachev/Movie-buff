import { useEffect, useState } from 'react';
import { FetchData } from '../../types/fetch-data';
import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';

function ContentBoard(): JSX.Element {
  const [filmCards, setFilmCards] = useState([] as Film[]);
  const [showPageCount, setShowPageCount] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(0);

  const showFilmCards = filmCards.map((film) => <FilmCard film={film} key={film.filmId}/>);

  useEffect(() => {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${showPageCount}`, {
      method: 'GET',
      headers: {
          'X-API-KEY': '61bb7a97-7cb8-418b-a9e0-a9c0a84911b8',
          'Content-Type': 'application/json',
      },
    })
      .then<FetchData>(res => res.json())
      .then(res => setFilmCards((prevState) => {
        setMaxPageNumber(res.pagesCount);
        if( prevState.length > 0 && prevState[0].filmId === res.films[0].filmId) {
          return prevState;
        } 
        return prevState.concat(res.films)
      }));

  }, [showPageCount]);

  function onShowMoreButtonClick () {
    setShowPageCount(showPageCount + 1);
  }

  return (
    <section className="films-list">
      <div className="films-list__container">{showFilmCards.length > 0 && showFilmCards}</div>

      {showPageCount !== maxPageNumber && <button className="films-list__show-more" onClick={onShowMoreButtonClick}>Показать больше</button>}
    </section>
  );
}

export default ContentBoard;
