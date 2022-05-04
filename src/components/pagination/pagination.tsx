import { useState } from 'react';
import PropTypes from 'prop-types';

type Props = {
  currentPageNumber: number;
  maxPagesNumber: number;
  setPageNumber: (page: number) => void;
};

function Pagination({ currentPageNumber, maxPagesNumber, setPageNumber }: Props): JSX.Element {
  const MAX_PAGE_BUTTONS_COUNT = 3;

  const [paginationSection, setPaginationSection] = useState(0);

  const pages = new Array(maxPagesNumber).fill('').map((value, i) => (value = i + 1));
  const currentPages = pages.slice(
    paginationSection * MAX_PAGE_BUTTONS_COUNT,
    paginationSection * MAX_PAGE_BUTTONS_COUNT + MAX_PAGE_BUTTONS_COUNT,
  );

  if (!currentPages.includes(currentPageNumber) && pages.includes(currentPageNumber)) {
    if (currentPageNumber % MAX_PAGE_BUTTONS_COUNT) {
      setPaginationSection(Math.floor(currentPageNumber / MAX_PAGE_BUTTONS_COUNT));
    } else {
      setPaginationSection(currentPageNumber / MAX_PAGE_BUTTONS_COUNT - 1);
    }
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPageNumber > 1 && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <div
              className="link pagination__page-link"
              onClick={() => setPageNumber(currentPageNumber - 1)}
            >
              Назад
            </div>
          </li>
        )}
        {currentPages[0] && (
          <li
            className={`pagination__page ${
              currentPageNumber === currentPages[0] ? 'pagination__page--active' : ''
            }`}
          >
            <div
              className="link pagination__page-link"
              onClick={() => setPageNumber(currentPages[0])}
            >
              {currentPages[0]}
            </div>
          </li>
        )}
        {currentPages[1] && (
          <li
            className={`pagination__page ${
              currentPageNumber === currentPages[1] ? 'pagination__page--active' : ''
            }`}
          >
            <div
              className="link pagination__page-link"
              onClick={() => setPageNumber(currentPages[1])}
            >
              {currentPages[1]}
            </div>
          </li>
        )}
        {currentPages[2] && (
          <li
            className={`pagination__page ${
              currentPageNumber === currentPages[2] ? 'pagination__page--active' : ''
            }`}
          >
            <div
              className="link pagination__page-link"
              onClick={() => setPageNumber(currentPages[2])}
            >
              {currentPages[2]}
            </div>
          </li>
        )}
        {currentPageNumber + 1 <= maxPagesNumber && (
          <li className="pagination__page pagination__page--next" id="next">
            <div
              className="link pagination__page-link"
              onClick={() => setPageNumber(currentPageNumber + 1)}
            >
              Далее
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPageNumber: PropTypes.number.isRequired,
  maxPagesNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
};

export default Pagination;
