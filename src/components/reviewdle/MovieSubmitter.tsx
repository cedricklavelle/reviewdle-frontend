import { Autocomplete, TextField, Button } from "@mui/material";
import React from "react";
import { GameState } from "~/types/gameState";
import { Movie } from "~/types/movie";


type ReviewdleMovieSubmitterProps = {
    movies: Movie[]
    gameOver: boolean;
    gameState: GameState;
    handleSelectMovie: (newInputValue: Movie | null) => void;
    handleInputChange: (newInputValue: string) => void;
    handleSubmit: () => void;
}

export const ReviewdleMovieSubmitter: React.FC<ReviewdleMovieSubmitterProps> = ({
  movies,
  gameOver,
  gameState,
  handleSelectMovie,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <>
      <Autocomplete
        sx={{ width: "100%", mb: 2 }}
        options={movies}
        disabled={gameOver}
        value={gameState.movieGuess}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(e, newInputValue) => handleSelectMovie(newInputValue)}
        slotProps={{
          listbox: {
            sx: {
              maxHeight: 240,
              overflowY: "auto",
            },
          },
        }}
        inputValue={gameState.input}
        onInputChange={(e, newInputValue) => handleInputChange(newInputValue)}
        renderInput={(params) => <TextField label="movies" {...params} />}
      />
      <Button
        disabled={gameOver || gameState.movieGuess === null}
        onClick={() => handleSubmit()}
        variant="contained"
      >
        Submit
      </Button>
    </>
  );
};
