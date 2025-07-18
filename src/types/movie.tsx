export type Review = {
  review: string;
  hintNumber: number;
};

export type Movie = {
  id: string;
  name: string;
  dailyDate: string;
  genres: string[];
  releaseYear: number;
  letterboxdScore: number;
  reviews: Review[];
};
