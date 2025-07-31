import { Review } from "./review";

export type Movie = {
  id: string;
  title: string;
  poster: string;
  dailyDate: string;
  genres: string[];
  releaseDate: number;
  letterboxdScore: number;
  reviews: Review[];
};
