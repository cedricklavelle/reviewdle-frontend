import { Movie} from "./movie";
import { Review } from "./review";

export type Game = {
    id?: number | null;
    date?: string | null;
    reviews: Review[];
    movie?: Movie | null;
    name?: string | null;
  };
  