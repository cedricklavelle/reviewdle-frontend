import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useFetchMovies from "~/hooks/useFetchMovies";
import { Route } from "~/routes/archives/$gameId";
import { Game as GameType } from "~/types/game";
import { IndexPicker } from "~/components/IndexPicker";
import { useReviewdleGameState } from "~/hooks/useReviewdleGameState";
import { ReviewdleEndgameDisplay } from "~/components/ReviewdleEndgameDisplay";
import { ReviewdleHintDisplay } from "~/components/ReviewdleHintDisplay";
import { ReviewdleReviewDisplay } from "~/components/ReviewdleReviewDisplay";
import { ReviewdleGuessDisplay } from "~/components/ReviewdleGuessDisplay";
import { ReviewdleMovieSubmitter } from "~/components/ReviewdleMovieSubmitter";
import { Movie } from "~/types/movie";

const centeredFlex = {
  display: "flex",
  justifyContent: "center",
};

export const Game = () => {
  const game: GameType = Route.useLoaderData();
  const { state, dispatch } = useReviewdleGameState(game);

  const { movies } = useFetchMovies(state.input);
  const gameOver = state.isGameWon || state.isGameLost;
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
        <Typography variant="h2">Daily game</Typography>
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
          <ReviewdleHintDisplay
            reviewNumberRevealed={maxDisplayedHint}
            isGameWon={state.isGameWon}
            movie={game.movie}
          ></ReviewdleHintDisplay>
          <Box
            mt={8}
            pl={2}
            pr={2}
            sx={{
              ...centeredFlex,
            }}
          >
            <Stack spacing={2} direction="column">
              {gameOver && (
                <ReviewdleEndgameDisplay
                  game={game}
                  gameState={state}
                ></ReviewdleEndgameDisplay>
              )}
              <ReviewdleReviewDisplay
                reviews={game.reviews}
                index={state.currentIndex}
              ></ReviewdleReviewDisplay>
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
                winningIndex={
                  state.guesses.findIndex((guess) => guess.guessSuccess) + 1
                }
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
          <ReviewdleMovieSubmitter movies={movies} gameOver={gameOver} gameState={state} handleSelectMovie={(newInputValue: Movie | null)=> dispatch({
            type:"SET_SELECTED_MOVIE",
            selectedMovie: newInputValue
          })} handleInputChange={(newInputValue: string) => dispatch({
            type:"SET_INPUT",
            input: newInputValue
          })} handleSubmit={() => dispatch({
            type: "SUBMIT"
          })}>

          </ReviewdleMovieSubmitter>
          <ReviewdleGuessDisplay
            guesses={state.guesses}
          ></ReviewdleGuessDisplay>
        </Box>
      </Stack>
    </Box>
  );
};
