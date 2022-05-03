import {Navigation, SearchContentBoard, SearchFilters} from '../../components'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getFoundFilms } from '../../store/selectors';
import { fetchSearchedFilmsAction } from '../../store/api-actions';
import { clearFoundFilms } from '../../store/actions';

export function SearchPage(): JSX.Element {
  const location = useLocation();
  const foundFilms = useSelector(getFoundFilms);
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!location.search && foundFilms.total > 0) {
      dispatch(clearFoundFilms());
    }
  });

  useEffect(() => {
    if (!isLoaded && location.search) {
      dispatch(fetchSearchedFilmsAction(location.search));
      setIsLoaded(true);

      return () => {
        dispatch(clearFoundFilms());
      };
    }
  }, [dispatch, isLoaded, location]);

  return (
    <main className="main">
      <Navigation />
      <SearchFilters />
      {isLoaded && <SearchContentBoard films={foundFilms} />}
    </main>
  );
}
