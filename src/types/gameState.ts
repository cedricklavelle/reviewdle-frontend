import { Movie } from "./movie";

export type Guess = {
  guessName: string;
  guessSuccess: boolean;
};

export type GameState = {
  movieAnswer: Movie | null | undefined ;
  movieGuess: Movie | null ;
  gameId: number | null
  input: string;
  isGameWon: boolean;
  isGameLost: boolean;
  guesses: Guess[];
  currentIndex: number;
};
