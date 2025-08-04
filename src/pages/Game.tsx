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
import useFetchMovies from "~/hooks/useFetchMovies";
import { Route } from "~/routes/archives/$gameId";
import { Game as GameType } from "~/types/game";
import { IndexPicker } from "~/components/IndexPicker";
import { useReviewdleGameState } from "~/hooks/useReviewdleGameState";

const centeredFlex = {
  display: "flex",
  justifyContent: "center",
};

const hintPlacement = {
  position: "absolute",
  top: 8,
};

export const Game = () => {
  const game: GameType = Route.useLoaderData();
  const {state, dispatch} = useReviewdleGameState(game)

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
                        width: "80%",
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
                      (review) => review.hintNumber === state.currentIndex
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
                <IndexPicker handleIndexClick={(reviewIndex: number) => dispatch({type:"SET_DISPLAY_INDEX", indexNumber: reviewIndex})} reviewIndex={state.currentIndex} maxDisplayedHint={maxDisplayedHint} disableButton={gameOver}>                 
                </IndexPicker>
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
                      maxHeight: 240, 
                      overflowY: "auto",
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
