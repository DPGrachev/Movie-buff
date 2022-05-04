import { Navigation, SearchContentBoard, SearchFilters } from '../../components';
import { useLocation } from 'react-router-dom';
import { createContext, useState } from 'react';
import { QueryParams } from '../../types/search';

const defaultParams: QueryParams = {
  ratingFrom: '1',
  ratingTo: '10',
  yearFrom: '1970',
  yearTo: '2022',
  keyword: 'Гарри Поттер',
  page: '1',
};

type Context = {
  params: QueryParams;
  changeParams?: (params: QueryParams) => void;
};

export const QueryContext = createContext<Context>({ params: defaultParams });

export function SearchPage(): JSX.Element {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    ratingFrom: urlParams.get('ratingFrom') || defaultParams.ratingFrom,
    ratingTo: urlParams.get('ratingTo') || defaultParams.ratingTo,
    yearFrom: urlParams.get('yearFrom') || defaultParams.yearFrom,
    yearTo: urlParams.get('yearTo') || defaultParams.yearTo,
    keyword: urlParams.get('keyword') || '',
    page: urlParams.get('page') || defaultParams.page,
  });

  function changeQuery(params: QueryParams) {
    setQueryParams(params);
  }

  return (
    <main className="main">
      <Navigation />
      <QueryContext.Provider
        value={{
          params: queryParams,
          changeParams: changeQuery,
        }}
      >
        <SearchFilters />
        {location.search && <SearchContentBoard />}
      </QueryContext.Provider>
    </main>
  );
}
