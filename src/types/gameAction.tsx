import { Movie } from "./movie";

export type GameAction =
  | { type: "SUBMIT" }
  | { type: "SKIP" }
  | { type: "SET_SELECTED_MOVIE"; selectedMovie: Movie | null }
  | { type: "SET_INPUT"; input: string }
  | { type: "SET_DISPLAY_INDEX"; indexNumber: number };