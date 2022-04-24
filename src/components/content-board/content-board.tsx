import { useEffect, useState } from 'react';
import FilmCard from '../film-card/film-card';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms, getMaxPageNumber } from '../../store/selectors';
import { fetchStartPageOfFilmsAction, fetchOtherPageOfFilmsAction } from '../../store/api-actions';

function ContentBoard(): JSX.Element {
  const filmCards = useSelector(getFilms);
  const maxPageNumber = useSelector(getMaxPageNumber);
  const dispatch = useDispatch();
  const [currentPageCount, setCurrentPageCount] = useState(1);

  const preparedFilmCards = filmCards.map((film) => <FilmCard film={film} key={film.filmId} />);

  useEffect(() => {
    if (currentPageCount === 1) {
      dispatch<any>(fetchStartPageOfFilmsAction());
    } else {
      dispatch<any>(fetchOtherPageOfFilmsAction(currentPageCount));
    }
  }, [currentPageCount, dispatch]);

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
