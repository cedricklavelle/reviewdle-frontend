import { Movie } from "./movie";

export type Guess = {
  guessName: String;
  guessSuccess: boolean;
};

export type GameState = {
  movieAnswer: Movie | null | undefined ;
  movieGuess: Movie | null ;
  input: string;
  isGameWon: boolean;
  isGameLost: boolean;
  guesses: Guess[];
  currentIndex: number;
};
