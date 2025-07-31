import {
  Autocomplete,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useReducer} from "react";

import { Movie } from "~/types/movie";
import { GameState, Guess } from "~/types/gameState";
import useFetchMovies from "~/hooks/useFetchMovies";
import { GameAction } from "~/types/gameAction";
import { Route } from "~/routes/archives/$gameId";
import { Game as GameType } from "~/types/game";

const centeredFlex = {
  display: "flex",
  justifyContent: "center",
};

const hintPlacement = {
  position: "absolute",
  top: 8,
};

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
        currentIndex: gameLost ? state.currentIndex : guesses.length,
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



export const Game = () => {
  const game: GameType | null = Route.useLoaderData();
  const [state, dispatch] = useReducer(reducer, {
    movieAnswer: game?.movie,
    movieGuess: null,
    input: "",
    gameWon: false,
    gameLost: false,
    guesses: [],
    currentIndex: 0,
  });

  const { movies } = useFetchMovies(state.input);
  const gameOver = state.gameWon || state.gameLost;
  const maxDisplayedHint = state.guesses.length + 1;
  console.log(state);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: 10,
      }}
    >
      <Stack
        sx={{
          ...centeredFlex,
          pt: 1,
        }}
        direction={"column"}
      >
        <Typography
          sx={{
            ...centeredFlex,
          }}
          variant="h2"
        >
          Daily game
        </Typography>
        <Box
          sx={{
            position: "relative",
            border: "1px solid white",
            m: "auto",
            mt: 5,
            bgcolor: "#222",
            maxWidth: 500,
          }}
        >
          <Stack
            visibility="hidden"
            sx={{
              ...hintPlacement,
              visibility:
                maxDisplayedHint >= 3 || state.gameWon ? "visible" : "hidden",
            }}
            direction="row"
          >
            {game?.movie?.genres.map((genre) => (
              <Chip key={genre} sx={{ ml: 1 }} label={genre}></Chip>
            ))}
          </Stack>
          <Chip
            key="releaseYear"
            sx={{
              ...hintPlacement,
              right: 8,
              visibility:
                maxDisplayedHint >= 5 || state.gameWon ? "visible" : "hidden",
            }}
            label={`Release year: ${new Date(game.movie.releaseDate).getFullYear()}`}
          />
          <Paper square={false} elevation={20}>
            <Box
              pt={10}
              pl={2}
              pr={2}
              sx={{
                ...centeredFlex,
              }}
            >
              <Stack direction="column">
                {state.gameLost && (
                  <Box pb={2}>
                    <Typography
                      sx={{ ...centeredFlex }}
                      variant="h3"
                      color="error"
                    >
                      GAME OVER
                    </Typography>
                    <Typography
                      gutterBottom
                      sx={{ ...centeredFlex }}
                      variant="h6"
                    >
                      The correct movie was {game?.movie?.title}
                    </Typography>
                    <Box sx={{...centeredFlex}}>
                    <img
                      loading="lazy"
                      src={game?.movie?.poster}
                      alt="Movie Poster"
                      style={{
                        ...centeredFlex,
                        width: "75%",
                        height: "auto",
                        display: "block",
                        filter: "drop-shadow(0 0 100px black)",
                        borderRadius: "10px",
                      }}
                    />
                    </Box>
                  </Box>
                )}
                {state.gameWon && (
                  <Box pb={2}>
                    <Typography
                      gutterBottom
                      sx={{ ...centeredFlex }}
                      variant="h3"
                      color="success"
                    >
                      Congratulation
                    </Typography>
                    <Typography sx={{ ...centeredFlex }} variant="h6">
                      The correct movie was {game?.movie?.title}
                    </Typography>
                    <img
                      loading="lazy"
                      src={game?.movie?.poster}
                      alt="Movie Poster"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        filter: "drop-shadow(0 0 100px black)",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                )}
                <Typography
                  sx={{wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                  variant="h6"
                >
                  {
                    game?.reviews.find(
                      (review) => review.hintNumber === state.currentIndex + 1
                    )?.reviewText
                  }
                </Typography>
              </Stack>
            </Box>
            <Box
              padding={5}
              sx={{
                ...centeredFlex,
              }}
            >
              <Stack spacing={2} direction="row">
                <Button
                  onClick={() =>
                    dispatch({ type: "SET_DISPLAY_INDEX", indexNumber: 0 })
                  }
                  variant="contained"
                >
                  1
                </Button>
                <Button
                  disabled={maxDisplayedHint < 2 && !state.gameWon}
                  onClick={() =>
                    dispatch({ type: "SET_DISPLAY_INDEX", indexNumber: 1 })
                  }
                  variant="contained"
                >
                  2
                </Button>
                <Button
                  onClick={() =>
                    dispatch({ type: "SET_DISPLAY_INDEX", indexNumber: 2 })
                  }
                  disabled={maxDisplayedHint < 3 && !state.gameWon}
                  variant="contained"
                >
                  3
                </Button>
                <Button
                  onClick={() =>
                    dispatch({ type: "SET_DISPLAY_INDEX", indexNumber: 3 })
                  }
                  disabled={maxDisplayedHint < 4 && !state.gameWon}
                  variant="contained"
                >
                  4
                </Button>
                <Button
                  onClick={() =>
                    dispatch({ type: "SET_DISPLAY_INDEX", indexNumber: 4 })
                  }
                  disabled={maxDisplayedHint < 5 && !state.gameWon}
                  variant="contained"
                >
                  5
                </Button>
                <Button
                  onClick={() => dispatch({ type: "SKIP" })}
                  disabled={gameOver}
                  color="warning"
                  variant="contained"
                >
                  Skip
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
        <Box pt={2}>
          <Stack direction="column">
            <Stack spacing={-4} direction="column">
              <Autocomplete
                sx={{ width: "100%", height: 100 }}
                options={movies}
                disabled={gameOver}
                value={state.movieGuess}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, newInputValue) =>
                  dispatch({
                    type: "SET_SELECTED_MOVIE",
                    selectedMovie: newInputValue,
                  })
                }
                slotProps={{
                  listbox: {
                    sx: {
                      maxHeight: 240, // limit total visible options height
                      overflowY: "auto", // enable scroll only here
                    },
                  },
                }}
                inputValue={state.input}
                onInputChange={(e, newInputValue) =>
                  dispatch({ type: "SET_INPUT", input: newInputValue })
                }
                renderInput={(params) => (
                  <TextField label="movies" {...params} />
                )}
              />
              <Button
                disabled={gameOver || state.movieGuess === null}
                onClick={() => dispatch({ type: "SUBMIT" })}
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
            <List>
              {state.guesses
                .slice()
                .reverse()
                .map((guess, index) => {
                  const IconComponent = guess.guessSuccess
                    ? CheckCircleIcon
                    : HighlightOffIcon;
                  const iconColor = guess.guessSuccess
                    ? "success.main"
                    : "error.main";

                  return (
                    <ListItem
                      key={index}
                      sx={{
                        bgcolor: "background.paper",
                        outline: "black",
                      }}
                    >
                      <ListItemIcon sx={{ color: iconColor }}>
                        <IconComponent />
                      </ListItemIcon>
                      <ListItemText>{guess.guessName}</ListItemText>
                    </ListItem>
                  );
                })}
            </List>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
