import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useFetchMovies from "~/hooks/useFetchMovies";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { IndexPicker } from "~/components/reviewdle/IndexPicker";

import { Game } from "~/types/game";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ReviewdleReviewDisplay } from "~/components/reviewdle/ReviewDisplay";
import { useReviewdleForm } from "~/hooks/useReviewdleForm";
import { useState } from "react";
import { checkGameExists } from "~/api/reviewdleApi";
import { Review } from "~/types/review";


type AddGameProps = {
    game?: Game;
    date?: string;
};

const AddGame = ({game, date}: AddGameProps) => {

  
  const {
    form,
    fields,
    handleAddReview,
    reviewInput,
    setReviewInput,
    successMessage,
    submitGame,
    reviewIndex,
    setReviewIndex
  } = useReviewdleForm(game, date);

  const [movieNameInput, setMovieNameInput] = useState("");
  const { control, register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const reviews: Review[] = watch("reviews");
  const {movies} = useFetchMovies(movieNameInput);

  const centeredFlex = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      pt={10}
    >
      <Stack width={400} direction="column" spacing={2} alignItems="center">
        <Box>
          <Typography variant="h2" gutterBottom>
            {game ? "Edit game" : "Add game"}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(submitGame)}>
          <Controller
            name="movie"
            control={control}
            rules={{ required: "date is required" }}
            render={({ field, fieldState }) => (
              <Autocomplete
                sx={{ height: 100, width: "100%" }}
                options={movies}
                value={field.value}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, newValue) => field.onChange(newValue)}
                inputValue={movieNameInput}
                onInputChange={(event, newInputValue) => {
                  setMovieNameInput(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    label="Movie title"
                    {...params}
                    error={!!errors.movie}
                    helperText={errors?.movie?.message}
                  />
                )}
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <Controller
              name="date"
              control={control}
              rules={{
                required: "Date is required",
                validate: async (value) => {
                  if (game && game.date===value) return true;
                  if (!value) return "Date is required"; 
                  try {
                    const data = await checkGameExists(value);
                    return data.exists ? "A game already exists for this date." : true;
                  } catch (error) {
                    console.error("Something went wrong while validating the date: " + error);
                  }
                },
              }}
              render={({ field, fieldState }) => (
                <DatePicker
                  sx={{
                    pb: 1,
                  }}
                  /*                   disablePast */
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    if (newValue) {
                      field.onChange(dayjs(newValue).format("YYYY-MM-DD")); 
                    } else {
                      field.onChange(null);
                    }
                  }}
                  label="Game date"
                  slotProps={{
                    textField: {
                      helperText:
                        fieldState.error?.message || "Please select a date",
                      error: !!fieldState.error,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <Paper sx={{ minHeight: 80  }}>
            <ReviewdleReviewDisplay
              reviews={reviews}
              index={reviewIndex}
            ></ReviewdleReviewDisplay>
          </Paper>
          <Box
            pt={3}
            sx={{
              ...centeredFlex,
            }}
          >
            <Stack direction="column">
              <Stack spacing={2} direction="row" pb={4}>
                <IndexPicker
                  handleIndexClick={setReviewIndex}
                  reviewIndex={reviewIndex}
                ></IndexPicker>
              </Stack>
              <Stack>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    label="Review"
                    value={reviewInput}
                    onChange={(e) => setReviewInput(e.target.value)}
                    error={!!errors.reviews}
                    helperText={errors.reviews?.message}
                  />

                  <Button
                    sx={{ ml: 2 }}
                    disabled={reviewInput === ""}
                    onClick={handleAddReview}
                  >
                    {!reviews?.find(
                      (review) => review?.hintNumber === reviewIndex
                    )
                      ? "Add"
                      : "Replace"}
                  </Button>
                  {fields.map((field, index) => (
                    <input
                      key={field.id}
                      {...register(`reviews.${index}` as const)}
                      type="hidden"
                      value={field as unknown as string}
                    />
                  ))}
                </Box>
              </Stack>
              <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
        <DevTool control={control}></DevTool>
        {successMessage ? (
        <Typography
          sx={{ ...centeredFlex }}
          mt={2}
          variant="h5"
          color="success"
        >
          {successMessage}
        </Typography>
      ) : (
        <></>
      )}
      </Stack>
    </Box>
  );
};

export default AddGame;
