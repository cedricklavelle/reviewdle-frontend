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
  const { state, dispatch } = useReviewdleGameState(game);

  const { movies } = useFetchMovies(state.input);
  const gameOver = state.gameWon || state.gameLost;
  const maxDisplayedHint = state.guesses.length + 1;
  return (
    <Box
      sx={{
        ...centeredFlex,
        pt: 5,
      }}
    >
      <Stack
        sx={{
          ...centeredFlex,
          pt: 1,
          alignItems: "center",
        }}
        direction="column"
      >
        <Typography
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
              pt={5}
              pl={2}
              pr={2}
              sx={{
                ...centeredFlex,
              }}
            >
              <Stack direction="column">
                  <Box pb={2} >
                    {gameOver && (
                      <>
                    <Typography

                      sx={{ ...centeredFlex, pt:1 }}
                      variant="h3"
                      color={state.gameWon ? "success" : "error"}
                    >
                      {state.gameWon ? "Congratulation" : "Game Over" }
                    </Typography>
                    <Typography sx={{ ...centeredFlex }} variant="h6">
                      The correct movie was {game?.movie?.title}
                    </Typography>
                    <Box sx={{...centeredFlex}}>
                    <img
                      loading="lazy"
                      src={game?.movie?.poster}
                      alt="Movie Poster"
                      style={{
                        justifyContent: "center",
                        width: "75%",
                        height: "auto",
                        display: "block",
                        borderRadius: "10px",
                      }}
                    /></Box></>)}
                  </Box>
                <Typography
                  sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
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
                <IndexPicker
                  handleIndexClick={(reviewIndex: number) =>
                    dispatch({
                      type: "SET_DISPLAY_INDEX",
                      indexNumber: reviewIndex,
                    })
                  }
                  winningIndex={state.guesses.findIndex((guess) => guess.guessSuccess) + 1}
                  reviewIndex={state.currentIndex}
                  maxDisplayedHint={maxDisplayedHint}
                  disableButton={gameOver}
                ></IndexPicker>
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
        <Box
          width="100%"
          pt={2}
          sx={{
            "& > *": {
              width: "100%",
            },
          }}
        >
          <Autocomplete
            sx={{ width: "100%", mb:2}}
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
            renderInput={(params) => <TextField label="movies" {...params} />}
          />
          <Button
            disabled={gameOver || state.movieGuess === null}
            onClick={() => dispatch({ type: "SUBMIT" })}
            variant="contained"
          >
            Submit
          </Button>
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
        </Box>
      </Stack>
    </Box>
  );
};
