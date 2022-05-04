import { useState } from 'react';
import { FilmCard } from '../film-card/film-card';
import { useGetTopFilmsQuery } from '../../store/api';
import { Pagination } from '../pagination/pagination';

export function ContentBoard(): JSX.Element {
  const [currentPageCount, setCurrentPageCount] = useState(1);
  const { data, isLoading } = useGetTopFilmsQuery(currentPageCount);

  const preparedFilmCards = data?.films.map((film) => <FilmCard film={film} key={film.filmId} />);

  return (
    <section className="films-list">
      {isLoading && <h1>...Загрузка</h1>}
      <Pagination
        maxPagesNumber={data?.pagesCount as number}
        currentPageNumber={currentPageCount}
        setPageNumber={setCurrentPageCount}
      />
      <div className="films-list__container">
        {preparedFilmCards && preparedFilmCards.length > 0 && preparedFilmCards}
      </div>
      <Pagination
        maxPagesNumber={data?.pagesCount as number}
        currentPageNumber={currentPageCount}
        setPageNumber={setCurrentPageCount}
      />
    </section>
  );
}
