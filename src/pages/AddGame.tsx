import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Movie } from "~/types/movie";
import useFetchMovies from "~/hooks/useFetchMovies";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Review } from "~/types/review";
import { IndexPicker } from "~/components/reviewdle/IndexPicker";
import { useLoaderData } from "@tanstack/react-router";
import { Game } from "~/types/game";
import { Route } from "~/routes/reviewdle/admin/edit/$gameId";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ReviewdleReviewDisplay } from "~/components/reviewdle/ReviewDisplay";
import { date } from "zod";

const AddGame = () => {
  const [movieNameInput, setMovieNameInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [reviewIndex, setReviewIndex] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const { movies, isLoading, error } = useFetchMovies(movieNameInput);
  const form = useForm<Game>({
    defaultValues: {
      movie: null,
      date: new Date().toString(),
      reviews: [],
      name: "reviewdle",
    },
  });

  const { register, handleSubmit, watch, reset, formState, control } = form;
  const { errors } = formState;

  const reviews: Review[] = watch("reviews");
  console.log(reviews);

  const { fields, append } = useFieldArray({
    control,
    name: "reviews",
    rules: {
      validate: (value) => value.length === 5 || "You need five reviews.",
    },
  });

  const centeredFlex = {
    display: "flex",
    justifyContent: "center",
  };

  const handleAddReview = () => {
    const existingIndex = reviews.findIndex(
      (review) => review.hintNumber === reviewIndex
    );

    const newReview = {
      reviewText: reviewInput,
      hintNumber: reviewIndex,
    };

    if (reviewIndex < 5) {
      setReviewIndex(reviewIndex + 1);
    }

    if (existingIndex !== -1) {
      reviews[existingIndex] = newReview;
    } else {
      append(newReview);
    }

    console.log("added review! -> " + reviews);

    setReviewInput("");
  };

  const onSubmit = async (data: Game) => {
    const payload = {
      gameName: data.name,
      date: data.date,
      movieId: data.movie?.id,
      reviews: data.reviews,
    };

    try {
      console.log("about to fetch");
      const response = await fetch("http://localhost:3005/games/reviewdle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      const result = await response.text();
      setSuccessMessage(
        `Succesfully added reviewdle for ${data.movie?.title}, date of the game : ${payload.date}`
      );
      reset();
      console.log("Submitted successfully:", result);
    } catch (error) {
      console.error(error);
    }
    console.log(data);
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      pt={10}
    >
      <Stack width={400} direction="column" spacing={2} alignItems="center">
        <Box>
          <Typography variant="h2" gutterBottom>
            ADD GAME
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  try {
                    console.log("about to fetch");
                    const response = await fetch(
                      `http://localhost:3005/games/reviewdle/exists/${value}`,
                      {
                        method: "GET",
                      }
                    );
                    const data = await response.json();
                    console.log(data);
                    if (data.exists) {
                      return "A game with that date already exists";
                    }
                  } catch (error) {
                    console.error(error);
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
          <Paper sx={{ height: 75 }}>
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
