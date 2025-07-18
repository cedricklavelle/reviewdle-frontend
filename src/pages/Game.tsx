import {
  Avatar,
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

import { useState } from "react";
import { Route } from "~/routes/daily";
import { Movie } from "~/types/movie";
import { Guess } from "~/types/guess";

const centeredFlex = {
  display: "flex",
  justifyContent: "center",
};

const hintPlacement = {
  position: "absolute",
  top: 8,
};

export const Game = () => {
  const movie: Movie = Route.useLoaderData();
  const [displayedReviewIndex, setDisplayedReviewIndex] = useState<number>(1);
  const [maxDisplayedHint, setmaxDisplayedHint] = useState<number>(1);
  const [inputValue, setInputValue] = useState("");

  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const handleSubmit = () => {
    if (inputValue === movie.name) {
      setGameWon(true);
    }
    setGuesses([
      ...guesses,
      {
        guessName: inputValue,
        guessNumber: maxDisplayedHint,
        guessSuccess: inputValue === movie.name,
      },
    ]);
    if (inputValue != movie.name) {
      setmaxDisplayedHint(maxDisplayedHint + 1);
      setDisplayedReviewIndex(maxDisplayedHint + 1);
    }
    setInputValue("");
  };
  const gameLost = maxDisplayedHint >= 6;
  const gameOver = gameLost || gameWon;
  const handleSkip = () => {
    setmaxDisplayedHint(maxDisplayedHint + 1);
    setDisplayedReviewIndex(maxDisplayedHint + 1);
    setGuesses([
      ...guesses,
      {
        guessName: "Skipped",
        guessNumber: maxDisplayedHint,
        guessSuccess: false,
      },
    ]);
    setInputValue("");
  };

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
                maxDisplayedHint > 2 || gameWon ? "visible" : "hidden",
            }}
            direction="row"
          >
            {movie.genres.map((genre) => (
              <Chip key={genre} sx={{ ml: 1 }} label={genre}></Chip>
            ))}
          </Stack>
          <Chip
            key="releaseYear"
            sx={{
              ...hintPlacement,
              right: 8,
              visibility:
                maxDisplayedHint > 4 || gameWon ? "visible" : "hidden",
            }}
            label={`Release year : ${movie.releaseYear}`}
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
                {gameLost && (
                  <Box pb={2}>
                    <Typography
                      sx={{ ...centeredFlex }}
                      variant="h3"
                      color="error"
                    >
                      {" "}
                      GAME OVER
                    </Typography>
                    <Typography variant="h6">
                      The correct movie was {movie.name}
                    </Typography>
                  </Box>
                )}
                {gameWon && (
                  <Box pb={2}>
                    <Typography
                      sx={{ ...centeredFlex }}
                      variant="h3"
                      color="success"
                    >
                      {" "}
                      Congratulation
                    </Typography>
                    <Typography variant="h6">
                      The correct movie was {movie.name}
                    </Typography>
                  </Box>
                )}
                <Typography sx={{ ...centeredFlex }} variant="h6">
                  {
                    movie.reviews.find(
                      (review) => review.hintNumber === displayedReviewIndex
                    )?.review
                  }
                </Typography>
              </Stack>{" "}
            </Box>
            <Box
              padding={5}
              sx={{
                ...centeredFlex,
              }}
            >
              <Stack spacing={2} direction="row">
                <Button
                  onClick={() => setDisplayedReviewIndex(1)}
                  variant="contained"
                >
                  1
                </Button>
                <Button
                  disabled={maxDisplayedHint < 2 && !gameWon}
                  onClick={() => setDisplayedReviewIndex(2)}
                  variant="contained"
                >
                  2
                </Button>
                <Button
                  onClick={() => setDisplayedReviewIndex(3)}
                  disabled={maxDisplayedHint < 3 && !gameWon}
                  variant="contained"
                >
                  3
                </Button>
                <Button
                  onClick={() => setDisplayedReviewIndex(4)}
                  disabled={maxDisplayedHint < 4 && !gameWon}
                  variant="contained"
                >
                  4
                </Button>
                <Button
                  onClick={() => setDisplayedReviewIndex(5)}
                  disabled={maxDisplayedHint < 5 && !gameWon}
                  variant="contained"
                >
                  5
                </Button>
                <Button
                  onClick={handleSkip}
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
              <TextField
                sx={{ width: "100%", height: 100 }}
                variant="outlined"
                label="Movie Name"
                value={inputValue}
                disabled={gameOver}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                disabled={gameOver}
                onClick={handleSubmit}
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
            <List>
              {guesses.map((guess) => (
                <ListItem
                  key={guess.guessNumber}
                  sx={{
                    bgcolor: "background.paper",
                    outline: "black",
                  }}
                >
                  {guess.guessSuccess === false && (
                    <ListItemIcon
                      sx={{
                        color: "error.main",
                      }}
                    >
                      <HighlightOffIcon></HighlightOffIcon>
                    </ListItemIcon>
                  )}
                  {guess.guessSuccess === true && (
                    <ListItemIcon
                      sx={{
                        color: "success.main",
                      }}
                    >
                      <CheckCircleIcon></CheckCircleIcon>
                    </ListItemIcon>
                  )}
                  <ListItemText>{guess.guessName}</ListItemText>{" "}
                </ListItem>
              ))}
            </List>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
