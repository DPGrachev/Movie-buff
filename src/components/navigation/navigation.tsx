import { ContentType } from '../../const';
import NavigationItem from '../navigation-item/navigation-item';

function Navigation(): JSX.Element {
  const navigationItems = Object.values(ContentType).map((item) => <NavigationItem key={item} name={item}/>)

  return (
    <nav className="main-navigation">
      <div className="main-navigation__items">
        {navigationItems}
      </div>
      <a href="#stats" className="main-navigation__additional">
        Поиск фильмов
      </a>
    </nav>
  );
}

export default Navigation;
