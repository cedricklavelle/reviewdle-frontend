import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useFetchMovies from "~/hooks/useFetchMovies";
import { Route } from "~/routes/reviewdle/$gameId";
import { Game as GameType } from "~/types/game";
import { Movie } from "~/types/movie";
import { ReviewdleEndgameDisplay } from "~/components/reviewdle/Endgame";
import { ReviewdleGuessDisplay } from "~/components/reviewdle/GuessList";
import { ReviewdleHintDisplay } from "~/components/reviewdle/Hints";
import { IndexPicker } from "~/components/reviewdle/IndexPicker";
import { ReviewdleMovieSubmitter } from "~/components/reviewdle/MovieSubmitter";
import { ReviewdleReviewDisplay } from "~/components/reviewdle/ReviewDisplay";
import { useReviewdleGameState } from "~/hooks/useReviewdleGameState";
import DvdBackground from "~/components/Background";

const centeredFlex = {
  display: "flex",
  justifyContent: "center",
};

export const Game = () => {
  const game: GameType = Route.useLoaderData();
  const {
    state,
    skip,
    setInput,
    setHintNumberDisplayed,
    setSelectedMovie,
    submit,
  } = useReviewdleGameState(game);

  const { movies } = useFetchMovies(state.input);
  const gameOver = state.isGameWon || state.isGameLost;
  const maxDisplayedHint = state.guesses.length + 1;

  return (
    <>
      <DvdBackground></DvdBackground>
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
              border: "1px solid gray",
              borderRadius: 2,
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
                    setHintNumberDisplayed(reviewIndex)
                  }
                  winningIndex={
                    state.guesses.findIndex((guess) => guess.guessSuccess) + 1
                  }
                  reviewIndex={state.currentIndex}
                  maxDisplayedHint={maxDisplayedHint}
                  disableButton={gameOver}
                ></IndexPicker>
                <Button
                  onClick={skip}
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
            <ReviewdleMovieSubmitter
              movies={movies}
              gameOver={gameOver}
              gameState={state}
              handleSelectMovie={(newInputValue: Movie | null) =>
                setSelectedMovie(newInputValue)
              }
              handleInputChange={(newInputValue: string) =>
                setInput(newInputValue)
              }
              handleSubmit={submit}
            ></ReviewdleMovieSubmitter>
            <ReviewdleGuessDisplay
              guesses={state.guesses}
            ></ReviewdleGuessDisplay>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
