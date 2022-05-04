import { FilmCard } from '../film-card/film-card';
import { useGetSearchedFilmsQuery } from '../../store/api';
import { QueryContext } from '../../pages/search-page/search-page';
import { useContext } from 'react';
import { concatParams } from '../../utils';
import Pagination from '../pagination/pagination';

export function SearchContentBoard(): JSX.Element {
  const { params, changeParams } = useContext(QueryContext);
  const { data, isLoading } = useGetSearchedFilmsQuery(concatParams(params));
  const preparedFilmCards = data?.items.map((film) => <FilmCard film={film} key={film.filmId} />);

  if (isLoading) {
    return <h1>...Загрузка</h1>;
  }

  function changeParamsPage(page: number) {
    if (changeParams) {
      changeParams({
        ...params,
        page: `${page}`,
      });
    }
  }

  return (
    <section className="films-list">
      <p>Найдено фильмов: {data?.total}</p>
      <div className="films-list__container">
        {preparedFilmCards && preparedFilmCards.length > 0 && preparedFilmCards}
      </div>
      {data && (
        <Pagination
          maxPagesNumber={data.totalPages}
          currentPageNumber={Number(params.page)}
          setPageNumber={changeParamsPage}
        />
      )}
    </section>
  );
}
