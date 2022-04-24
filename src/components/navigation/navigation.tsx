import { Link } from 'react-router-dom';

function Navigation(): JSX.Element {
  return (
    <nav className="main-navigation">
      <div className="main-navigation__items">
        <Link to="/" className="main-navigation__item main-navigation__item--active">
          ТОП 250
        </Link>
        <a href="#watchlist" className="main-navigation__item">
          К просмотру <span className="main-navigation__item-count">0</span>
        </a>
        <a href="#history" className="main-navigation__item">
          История <span className="main-navigation__item-count">0</span>
        </a>
        <a href="#favorites" className="main-navigation__item">
          Любимые <span className="main-navigation__item-count">0</span>
        </a>
      </div>
      <a href="#stats" className="main-navigation__additional">
        Поиск фильмов
      </a>
    </nav>
  );
}

export default Navigation;
