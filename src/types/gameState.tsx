export type Guess = {
  guessName: String;
  guessSuccess: boolean;
};

export type GameState = {
  answer: string;
  input: string;
  gameWon: boolean;
  gameLost: boolean;
  guesses: Guess[];
  currentIndex: number;
};
