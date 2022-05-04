import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, ContentType } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getUser } from '../../store/selectors';
import { setContentType } from '../../store/user-data/user-data';

type Props = {
  name: ContentType;
};

export function NavigationItem({ name }: Props): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  let filmsCount = 0;

  if (user && name !== ContentType.topFilms) {
    const param = adaptTypeToUserData();
    if (param) {
      filmsCount = user[param].length;
    }
  }

  function adaptTypeToUserData() {
    switch (name) {
      case ContentType.watchList: {
        return 'watchlist';
      }
      case ContentType.history: {
        return 'history';
      }
      case ContentType.favorites: {
        return 'favorites';
      }
    }
  }

  function onClick(evt: MouseEvent) {
    dispatch(setContentType(name));
  }

  if (name === ContentType.topFilms) {
    return (
      <Link
        to={AppRoutes.Main}
        className={`main-navigation__item ${
          location.pathname === '/' ? 'main-navigation__item--active' : ''
        }`}
        onClick={onClick}
      >
        {name}
      </Link>
    );
  }

  return (
    <Link
      to={`/userFilms/${adaptTypeToUserData()}`}
      className={`main-navigation__item ${
        location.pathname.includes(adaptTypeToUserData() as string)
          ? 'main-navigation__item--active'
          : ''
      }`}
      onClick={onClick}
    >
      {name}
      {filmsCount > 0 && <span className="main-navigation__item-count">{filmsCount}</span>}
    </Link>
  );
}
