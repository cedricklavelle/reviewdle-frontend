import { Movie} from "./movie";
import { Review } from "./review";

export type Game = {
    id: number;
    date: string | null;
    reviews: Review[];
    movie: Movie | null;
  };
  