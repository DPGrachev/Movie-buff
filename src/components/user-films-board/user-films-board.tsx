import { useEffect, useState } from 'react';
import { FilmCard } from '../film-card/film-card';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import type { UserFavouritesType } from '../../types/user-data';
import { useGetUserFilmsQuery } from '../../store/api';
import Pagination from '../pagination/pagination';

const PAGE_STEP = 5;

type Props = {
  type: UserFavouritesType;
};

export function UserFilmsBoard({ type }: Props): JSX.Element {
  const user = useSelector(getUser);
  const [currentPage, setCurrentPage] = useState(1);
  const filmsId = user ? user[type] : [];
  const filmsCount = filmsId.length;

  const { data } = useGetUserFilmsQuery(
    filmsId.slice(PAGE_STEP * (currentPage - 1), PAGE_STEP * currentPage),
  );
  const preparedFilmCards = data?.map((film) => <FilmCard film={film} key={film.filmId} />);

  useEffect(() => {
    setCurrentPage(1);
  }, [type]);

  useEffect(() => {
    if (preparedFilmCards && preparedFilmCards?.length < 1) setCurrentPage(1);
  }, [preparedFilmCards]);

  return (
    <section className="films-list">
      <div className="films-list__container">
        {preparedFilmCards && preparedFilmCards.length ? (
          preparedFilmCards
        ) : (
          <h1>Вы еще не добавили фильмы в эту категорию</h1>
        )}
      </div>

      <Pagination
        currentPageNumber={currentPage}
        maxPagesNumber={Math.ceil(filmsCount / PAGE_STEP)}
        setPageNumber={setCurrentPage}
      />
    </section>
  );
}
