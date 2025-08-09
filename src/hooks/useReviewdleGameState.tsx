import { useReducer } from "react";
import { Game } from "~/types/game";
import { GameAction } from "~/types/gameAction";
import { GameState, Guess } from "~/types/gameState";
import useLocalStorage from "./useLocalStorage";

const MAX_GUESSES = 5;

function reducer(state: GameState, action: GameAction) {
  const { type } = action;
  const localStorageKeyId = `reviewdle-${state.gameId}}`;
  const { setItem } = useLocalStorage(localStorageKeyId);

  switch (type) {
    case "SUBMIT": {
      const movieGuess = state.movieGuess;
      const newGuess: Guess = {
        guessName: movieGuess ? movieGuess.title : "Skipped",
        guessSuccess: movieGuess
          ? state.movieAnswer?.id === movieGuess.id
          : false,
      };
      const guesses = [...state.guesses, newGuess];
      return {
        ...state,
        isGameWon: newGuess.guessSuccess,
        isGameLost: guesses.length >= MAX_GUESSES && !newGuess.guessSuccess,
        guesses: guesses,
        input: "",
        movieGuess: null,
        currentIndex: newGuess.guessSuccess
          ? state.currentIndex
          : guesses.length + 1,
      };
    }
    case "SKIP": {
      const newGuess: Guess = {
        guessName: "Skipped",
        guessSuccess: state.isGameWon,
      };
      const guesses = [...state.guesses, newGuess];
      const isGameLost = guesses.length >= MAX_GUESSES;
      return {
        ...state,
        guesses: guesses,
        currentIndex: isGameLost ? state.currentIndex : guesses.length + 1,
        isGameLost: isGameLost,
        movieGuess: null,
        input: "",
      };
    }
    case "SET_INPUT": {
      return { ...state, input: action.input };
    }
    case "SET_SELECTED_MOVIE": {
      return { ...state, movieGuess: action.selectedMovie };
    }
    case "SET_DISPLAY_INDEX":
      return { ...state, currentIndex: action.indexNumber };
    default:
      return state;
  }
}

export function useReviewdleGameState(initialState: GameState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
