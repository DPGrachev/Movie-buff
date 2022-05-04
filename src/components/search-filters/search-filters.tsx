import Slider from 'rc-slider';
import { handleRender } from './slider';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext, useState } from 'react';
import { AppRoutes } from '../../const';
import { QueryParams } from '../../types/search';
import { concatParams } from '../../utils';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateUser } from '../../store/user-data/user-data';
import { QueryContext } from '../../pages/search-page/search-page';

export function SearchFilters(): JSX.Element {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();
  const { params, changeParams } = useContext(QueryContext);

  const [queryParams, setQueryParams] = useState<QueryParams>(params);

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
    if (user) {
      dispatch(
        updateUser({
          ...user,
          searchHistory: user.searchHistory
            ? user.searchHistory.concat(queryParams)
            : [queryParams],
        }),
      );
    }
    if (changeParams) {
      changeParams(queryParams);
    }

    navigate(encodeURI(`?${concatParams(queryParams)}`));
  }

  function onSearchHistoryButtonClick() {
    navigate(AppRoutes.SearchHistory);
  }

  return (
    <section className="search-container">
      <div className="search_rating">
        <p className="search_label_params">
          Рейтинг от
          <span> {queryParams.ratingFrom}</span> до
          <span> {queryParams.ratingTo}</span>
        </p>
        <Slider
          marks={{ '1': '1', '10': '10' }}
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
          <span> {queryParams.yearFrom}</span> до
          <span> {queryParams.yearTo}</span>
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
      <button className="search-find-button" onClick={onSearchHistoryButtonClick}>
        История поиска
      </button>
    </section>
  );
}
