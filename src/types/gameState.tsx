import { Movie } from "./movie";

export type Guess = {
  guessName: String;
  guessSuccess: boolean;
};

export type GameState = {
  movieAnswer: Movie | null | undefined ;
  movieGuess: Movie | null ;
  input: string;
  gameWon: boolean;
  gameLost: boolean;
  guesses: Guess[];
  currentIndex: number;
};
