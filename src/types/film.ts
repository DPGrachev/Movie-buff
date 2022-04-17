export type Film = {
  filmId: number,
  nameRu: string,
  nameEn: string | null,
  year: string,
  filmLength: string,
  countries: FilmCountry[],
  genres: FilmGenre[],
  rating: string,
  ratingVoteCount: number,
  posterUrl: string,
  posterUrlPreview: string,
  ratingChange: null
}

type FilmCountry = {
  country: string
}

type FilmGenre = {
  genre: string
}