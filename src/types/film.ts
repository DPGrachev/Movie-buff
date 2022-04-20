export type Film = {
  filmId: number,
  nameRu: string,
  nameEn: string | null,
  year: string,
  filmLength: string,
  countries: Country[],
  genres: Genre[],
  rating: string,
  ratingVoteCount: number,
  posterUrl: string,
  posterUrlPreview: string,
  ratingChange: null
}

type Country = {
  country: string
}

type Genre = {
  genre: string
}