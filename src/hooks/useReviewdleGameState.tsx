import { useReducer } from "react";
import { Game } from "~/types/game";
import { GameAction } from "~/types/gameAction";
import { GameState, Guess } from "~/types/gameState";

const MAX_GUESSES = 5;

function reducer(state: GameState, action: GameAction) {
    const { type } = action;
  
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
          gameWon: newGuess.guessSuccess,
          gameLost: guesses.length >= MAX_GUESSES && !newGuess.guessSuccess,
          guesses: guesses,
          input: "",
          movieGuess: null,
          currentIndex: newGuess.guessSuccess
            ? state.currentIndex
            : guesses.length,
        };
      }
      case "SKIP": {
        const newGuess: Guess = {
          guessName: "Skipped",
          guessSuccess: state.gameWon,
        };
        const guesses = [...state.guesses, newGuess];
        const gameLost = guesses.length >= MAX_GUESSES
        return {
          ...state,
          guesses: guesses,
          currentIndex: gameLost ? state.currentIndex : guesses.length + 1,
          gameLost: gameLost,
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
  
export function useReviewdleGameState(gamePlayed : Game) {


    const lazyInit = (gamePlayed : Game): GameState => ({
        movieAnswer: gamePlayed?.movie,
        movieGuess: null,
        input: "",
        gameWon: false,
        gameLost: false,
        guesses: [],
        currentIndex: 1,
      });

    const[state, dispatch] = useReducer(reducer, gamePlayed, lazyInit)
    return {state, dispatch}

}