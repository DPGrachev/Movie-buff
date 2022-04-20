import { Film } from "./film"

export type FilmsResponse = {
  pagesCount: number,
  films: Film[],
}