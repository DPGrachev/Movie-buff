function Sort(): JSX.Element {
  return (
    <ul className="sort">
      <li>
        <a href="#" className="sort__button sort__button--active">
          Sort by default
        </a>
      </li>
      <li>
        <a href="#" className="sort__button">
          Sort by date
        </a>
      </li>
      <li>
        <a href="#" className="sort__button">
          Sort by rating
        </a>
      </li>
    </ul>
  );
}

export default Sort;
