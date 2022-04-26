import { useEffect, useState } from 'react';
import FilmCard from '../film-card/film-card';
import { useSelector } from 'react-redux';
import { getFilms, getMaxPageNumber } from '../../store/selectors';
import { fetchStartPageOfFilmsAction, fetchOtherPageOfFilmsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';

function ContentBoard(): JSX.Element {
  const filmCards = useSelector(getFilms);
  const maxPageNumber = useSelector(getMaxPageNumber);
  const dispatch = useAppDispatch();
  const [currentPageCount, setCurrentPageCount] = useState(1);

  const preparedFilmCards = filmCards.map((film) => <FilmCard film={film} key={film.filmId} />);

  useEffect(() => {
    if (currentPageCount === 1) {
      dispatch(fetchStartPageOfFilmsAction());
    } else {
      dispatch(fetchOtherPageOfFilmsAction(currentPageCount));
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
