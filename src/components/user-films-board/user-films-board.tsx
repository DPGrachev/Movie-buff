import { useEffect, useState } from 'react';
import FilmCard from '../film-card/film-card';
import { useSelector } from 'react-redux';
import { getUser, getUserFilms } from '../../store/selectors';
import { fetchUserFilmsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setUserFilms } from '../../store/actions';
import type { UserFavouritesType } from '../../types/user-data';

const PAGE_STEP = 5;

type Props = {
  type: UserFavouritesType;
};

function UserFilmsBoard({ type }: Props): JSX.Element {
  const user = useSelector(getUser);
  const films = useSelector(getUserFilms);
  const dispatch = useAppDispatch();
  const [filmsId, setFilmsId] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const filmsCount = filmsId.length;

  useEffect(() => {
    if (user) {
      setFilmsId(user[type]);
    }

    return () => {
      dispatch(setUserFilms([]));
    };
  }, [user, dispatch, type]);

  useEffect(() => {
    if (user![type] === filmsId) {
      filmsId.slice(PAGE_STEP * (currentPage - 1), PAGE_STEP * currentPage).forEach((id) => {
        dispatch(fetchUserFilmsAction(id));
      });
    }
  }, [filmsId, dispatch, user, currentPage, type]);

  const preparedFilmCards = films.map((film) => <FilmCard film={film} key={film.filmId} />);

  function onShowMoreButtonClick() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <section className="films-list">
      <div className="films-list__container">
        {preparedFilmCards.length > 0 && preparedFilmCards}
      </div>

      {filmsCount > PAGE_STEP * currentPage && (
        <button className="films-list__show-more" onClick={onShowMoreButtonClick}>
          Показать больше
        </button>
      )}
    </section>
  );
}

export default UserFilmsBoard;
