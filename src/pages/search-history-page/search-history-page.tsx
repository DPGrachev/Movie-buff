import { Navigation } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { QueryParams } from '../../types/search';
import { AppRoutes } from '../../const';
import { concatParams } from '../../utils';

export function SearchHistoryPage(): JSX.Element {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const preparedHistory = () =>
    user?.searchHistory.map((params) => (
      <div className="search-history-item" onClick={() => onHistoryItemClick(params)}>
        <span>Название: {params.keyword}</span>
        <span>
          Рейтинг от {params.ratingFrom} до {params.ratingTo}
        </span>
        <span>
          Год от {params.yearFrom} до {params.yearTo}
        </span>
      </div>
    ));

  function onHistoryItemClick(params: QueryParams) {
    navigate(`${AppRoutes.Search}?${concatParams(params)}`);
  }

  return (
    <main className="main">
      <Navigation />
      <h1 className="search-history-title">История Поиска</h1>
      <section>{preparedHistory()}</section>
    </main>
  );
}
