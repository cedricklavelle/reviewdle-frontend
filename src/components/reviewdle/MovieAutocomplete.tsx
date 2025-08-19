
import { Movie } from '~/types/movie';
import { Autocomplete, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useFetchMovies from '~/hooks/useFetchMovies';


interface MuiAutocompleteChildProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    movie: Movie | null | undefined;
    setMovie: React.Dispatch<React.SetStateAction<Movie | null | undefined>>;
    disabled: boolean
  }

export const MovieAutocomplete: React.FC<MuiAutocompleteChildProps> = ({
    inputValue,
    setInputValue,
    movie,
    setMovie,
    disabled
  }) => {
    const {movies, isLoading, error} = useFetchMovies(inputValue)

    return (
      <Stack spacing={2} width="250px">
        <Autocomplete
        sx={{ width: "200%", height: 100 }}
          options={movies}
          value={movie}
          disabled={disabled}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event: any, newValue: Movie | null) => setMovie(newValue)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => <TextField label="movies"  {...params} />}
        />
      </Stack>
    );
  };