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
import { Movie} from "~/types/movie";
import useFetchMovies from "~/hooks/useFetchMovies";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Review } from "~/types/review";
import { IndexPicker } from "~/components/IndexPicker";

const AddGame = () => {
  const [movieNameInput, setMovieNameInput] = useState("");
  const { movies, isLoading, error } = useFetchMovies(movieNameInput);
  const [movie, setMovie] = useState<Movie | null>();
  const [reviewText, setReviewText] = useState("");

  interface FormValues {
    movieId: number | null;
    date: Dayjs | null;
    reviews: Review[];
    gameName: string;
  }

  const [errors, setErrors] = useState<{
    movieId?: string;
    date?: string;
    reviews?: string;
    gameName?: string;
  }>({});

  const initialFormValues: FormValues = {
    movieId: null,
    date: dayjs(new Date()),
    reviews: [],
    gameName: "reviewdle",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [reviewIndex, setReviewIndex] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const handleAddReview = () => {
    const existingIndex = formValues.reviews.findIndex(
      (review) => review.hintNumber === reviewIndex
    );

    const newReview = {
      reviewText: reviewText,
      hintNumber: reviewIndex,
    };

    if (existingIndex !== -1) {
      formValues.reviews[existingIndex] = newReview;
    } else {
      setReviewIndex(reviewIndex + 1)
      formValues.reviews.push(newReview);
    }
    if (formValues.reviews.length >= 5) {
      delete errors.reviews;
    }
    setReviewText("");
  };

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      movieId: typeof movie?.id === "number" ? movie.id : null,
    }));
  }, [movie]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    delete errors.reviews;
    delete errors.movieId;
    delete errors.date;

    const formattedDate = formValues.date?.format("YYYY-MM-DD") ?? null;

    const payload = {
      ...formValues,
      date: formattedDate ?? null,
    };

    if (!formValues.movieId) {
      errors.movieId = "Movie is required";
    }

    if (!formValues.date) {
      errors.date = "Date is required";
    }
    console.log(formValues.reviews.length);

    if (formValues.reviews.length < 5) {
      errors.reviews = "You must provide 5 reviews";
    }
    console.log(errors);

    if (Object.keys(errors).length > 0) {
    setErrors({ ...errors });
      return;
    }
    console.log(JSON.stringify(payload));
    console.log(errors);

    try {
      console.log("about to fetch");
      const response = await fetch("http://localhost:3005/games/reviewdle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        setErrors({ date: "A game with this date already exists." });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      const result = await response.text();
      setSuccessMessage(
        `Succesfully added reviewdle for ${movie?.title}, date of the game : ${payload.date}`
      );
      console.log("Submitted successfully:", result);
      setFormValues(initialFormValues);
    } catch (error) {
      console.error(error);
    }

    console.log(payload);
  };

  const centeredFlex = {
    display: "flex",
    justifyContent: "center",
  };
  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      pt={10}
    >
      <Stack
        width={400}
        direction="column"
        spacing={2}
        alignItems="center"
      >
        <Box>
          <Typography variant="h2" gutterBottom>
            ADD GAME
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <Autocomplete
              sx={{ height: 100, width: "100%" }}
              options={movies}
              value={movie}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event: any, newValue: Movie | null) => {
                setMovie(newValue);
                delete errors.movieId;
              }}
              inputValue={movieNameInput}
              onInputChange={(event, newInputValue) => {
                setMovieNameInput(newInputValue);
                setErrors({ ...errors, movieId: "" });
              }}
              renderInput={(params) => (
                <TextField
                  label="Movie title"
                  {...params}
                  error={!!errors.movieId}
                  helperText={errors?.movieId}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <DatePicker
                sx={{
                  pb: 1,
                }}
                value={formValues.date}
                onChange={(newValue) => {
                  setFormValues({ ...formValues, date: newValue });
                  delete errors.date;
                }}
                slotProps={{
                  textField: {
                    error: !!errors.date,
                    helperText: errors.date,
                  },
                }}
                disablePast
                label="Game date"
              />
            </LocalizationProvider>
            <Paper>
              {!formValues.reviews.find(
                (review: Review) => review.hintNumber === reviewIndex
              ) ? (
                <Typography variant="h6" p={2}>
                  No review for hint #{reviewIndex} yet
                </Typography>
              ) : (
                <Typography
                  variant="h6"
                  p={2}
                  sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                >
                  {
                    formValues.reviews.find(
                      (review) => review.hintNumber === reviewIndex
                    )?.reviewText
                  }
                </Typography>
              )}
            </Paper>
            {errors.reviews ? (
              <Alert severity="error">{errors.reviews}</Alert>
            ) : (
              ""
            )}
            <Box
              pt={3}
              sx={{
                ...centeredFlex,
              }}
            >
              <Stack direction="column">
                <Stack spacing={2} direction="row" pb={4}>
                  <IndexPicker handleIndexClick={setReviewIndex} reviewIndex={reviewIndex}></IndexPicker>
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
                      onChange={(e) => setReviewText(e.target.value)}
                      fullWidth
                      value={reviewText}
                      multiline
                    />
                    <Button
                      onClick={handleAddReview}
                      sx={{ ml: 2 }}
                      disabled={!reviewText}
                    >
                      {!formValues.reviews.find(
                        (review) => review.hintNumber === reviewIndex
                      )
                        ? "Add"
                        : "Replace"}
                    </Button>
                  </Box>
                </Stack>
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  Submit
                </Button>
              </Stack>
            </Box>
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
          </FormControl>
        </form>
      </Stack>
    </Box>
  );
};

export default AddGame;
