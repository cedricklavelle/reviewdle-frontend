import { Review } from "./review";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  genres: string[];
  releaseDate: string;
  letterboxdScore: number;
};
