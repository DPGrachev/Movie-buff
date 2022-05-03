// import { useEffect, useState } from 'react';
import FilmCard from '../film-card/film-card';
// import { useSelector } from 'react-redux';
// import { getUser, getUserFilms } from '../../store/selectors';
// import { fetchUserFilmsAction } from '../../store/api-actions';
// import { useAppDispatch } from '../../hooks/useAppDispatch';
// import { setUserFilms } from '../../store/actions';
// import type { UserFavouritesType } from '../../types/user-data';
import { FilmInfo } from '../../types/film';

// const PAGE_STEP = 5;

type Props = {
  films: FilmInfo[];
  page: string;
};

function SearchContentBoard({ films, page }: Props): JSX.Element {
  const preparedFilmCards = films.map((film) => <FilmCard film={film} key={film.filmId} />);

  return (
    <section className="films-list">
      <div className="films-list__container">
        {preparedFilmCards.length > 0 && preparedFilmCards}
      </div>
    </section>
  );
}

export default SearchContentBoard;
