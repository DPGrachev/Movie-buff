import { Link } from 'react-router-dom';
import { AppRoutes, ContentType } from '../../const';
import { NavigationItem } from '../navigation-item/navigation-item';

export function Navigation(): JSX.Element {
  const navigationItems = Object.values(ContentType).map((item) => (
    <NavigationItem key={item} name={item} />
  ));

  return (
    <nav className="main-navigation">
      <div className="main-navigation__items">{navigationItems}</div>
      <Link to={AppRoutes.Search} className="main-navigation__additional">
        Поиск фильмов
      </Link>
    </nav>
  );
}
