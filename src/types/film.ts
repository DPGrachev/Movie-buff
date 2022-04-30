export type FilmShortInfo = {
  filmId: number;
  nameRu: string;
  nameEn: string | null;
  year: string;
  filmLength: string;
  countries: Country[];
  genres: Genre[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
  ratingChange: null;
};

export type FilmFullInfo = {
  completed: boolean;
  countries: Country[];
  coverUrl: string;
  description: string;
  editorAnnotation: null | string;
  endYear: null | number;
  filmLength: number;
  genres: Genre[];
  has3D: boolean;
  hasImax: boolean;
  imdbId: string;
  isTicketsAvailable: boolean;
  kinopoiskId: number;
  lastSync: string;
  logoUrl: string;
  nameEn: null | string;
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  productionStatus: null | string;
  ratingAgeLimits: string;
  ratingAwait: null | number;
  ratingAwaitCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingMpaa: string;
  ratingRfCritics: null | number;
  ratingRfCriticsVoteCount: number;
  reviewsCount: number;
  serial: boolean;
  shortDescription: string;
  shortFilm: boolean;
  slogan: string;
  startYear: null | number;
  type: string;
  webUrl: string;
  year: number;
};

export type FilmInfo = {
  filmId: number;
  nameRu: string;
  nameEn: string | null;
  year: number;
  filmLength: string | number;
  countries: Country[];
  genres: Genre[];
  rating:  number;
  posterUrl: string;
  description: string | null;
}

type Country = {
  country: string;
};

type Genre = {
  genre: string;
};
