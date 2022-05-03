import Slider from 'rc-slider';
import { handleRender } from './slider';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

type QueryParams = {
  ratingFrom: string | null;
  ratingTo: string | null;
  yearFrom: string | null;
  yearTo: string | null;
  keyword: string;
  page: string;
};

const defaultParams: QueryParams = {
  ratingFrom: '1',
  ratingTo: '10',
  yearFrom: '1970',
  yearTo: '2022',
  keyword: 'Гарри Поттер',
  page: '1',
};

function concatParams(params: QueryParams) {
  return Object.entries(params).reduce((acc, [param, value]) => {
    if (value) {
      return acc + `${param}=${value}&`;
    }
    return acc;
  }, '');
}

export function SearchFilters(): JSX.Element {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    ratingFrom: urlParams.get('ratingFrom') || defaultParams.ratingFrom,
    ratingTo: urlParams.get('ratingTo') || defaultParams.ratingTo,
    yearFrom: urlParams.get('yearFrom') || defaultParams.yearFrom,
    yearTo: urlParams.get('yearTo') || defaultParams.yearTo,
    keyword: urlParams.get('keyword') || '',
    page: urlParams.get('page') || defaultParams.page,
  });

  function onRatingChange(value: number[] | number) {
    const values = value as number[];
    const min = Math.min(...values);
    const max = Math.max(...values);

    setQueryParams((prevState) => ({
      ...prevState,
      ratingFrom: `${min}`,
      ratingTo: `${max}`,
    }));
  }

  function onYearChange(value: number[] | number) {
    const values = value as number[];
    const min = Math.min(...values);
    const max = Math.max(...values);

    setQueryParams((prevState) => ({
      ...prevState,
      yearFrom: `${min}`,
      yearTo: `${max}`,
    }));
  }

  function onNameFieldChange(evt: ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    setQueryParams((prevState) => ({
      ...prevState,
      keyword: encodeURI(evt.currentTarget.value),
    }));
  }

  function onFindButtonClick() {
    navigate(encodeURI(`?${concatParams(queryParams)}`));
  }

  return (
    <section className="search-container">
      <div className="search_rating">
        <p className="search_label_params">
          Рейтинг от
          <span> {queryParams.ratingFrom || defaultParams.ratingFrom}</span> до
          <span> {queryParams.ratingTo || defaultParams.ratingTo}</span>
        </p>
        <Slider
          marks={{ '1': defaultParams.ratingFrom, '10': defaultParams.ratingTo }}
          min={1}
          max={10}
          step={1}
          range
          allowCross={false}
          defaultValue={[Number(queryParams.ratingFrom), Number(queryParams.ratingTo)]}
          handleRender={handleRender}
          onAfterChange={onRatingChange}
        />
      </div>
      <div className="search_year">
        <p className="search_label_params">
          Год выхода от
          <span> {queryParams.yearFrom || defaultParams.yearFrom}</span> до
          <span> {queryParams.yearTo || defaultParams.yearTo}</span>
        </p>
        <Slider
          marks={{ '1970': '1970', '2022': '2022' }}
          min={1970}
          max={2022}
          step={1}
          range
          allowCross={false}
          defaultValue={[Number(queryParams.yearFrom), Number(queryParams.yearTo)]}
          handleRender={handleRender}
          onAfterChange={onYearChange}
        />
      </div>
      <div className="search_name">
        <p className="search_label_params">Название фильма</p>
        <input
          className="search_name_input"
          type="search"
          placeholder="Например: Гарри Поттер"
          value={decodeURI(queryParams.keyword)}
          onChange={onNameFieldChange}
        ></input>
      </div>
      <button className="search-find-button" onClick={onFindButtonClick}>
        Найти
      </button>
    </section>
  );
}
