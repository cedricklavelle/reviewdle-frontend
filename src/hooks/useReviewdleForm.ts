

import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { createReviewdleGame, updateReviewdleGame } from '~/api/reviewdleApi';
import { Game } from '~/types/game'
import { Review } from '~/types/review';

export function useReviewdleForm(game?: Game, date?: string) {


    const form = useForm<Game>({
        defaultValues: game
          ? {
              movie: game.movie,
              date: game.date,
              reviews: game.reviews,
              name: game.name,
            }
          : {
              movie: null,
              date: date ? date : dayjs().format("YYYY-MM-DD"),
              reviews: [],
              name: "reviewdle",
            },
      });

    const navigate = useNavigate();

    const [reviewInput, setReviewInput] = useState("");
    const [reviewIndex, setReviewIndex] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");

    const { handleSubmit, watch, reset, formState, control } = form;

    const submitGame = async (data: Game) => {
    try {
      if (game) {
        await updateReviewdleGame(data, game.id);
      } else {
        await createReviewdleGame(data);
      }
      setSuccessMessage(
        `Succesfully added reviewdle for ${data.movie?.title}, date of the game : ${data.date}`
      );
      reset();

      if(game) {
        navigate({to: "/reviewdle/admin"})
      }
     } catch (error) {
      console.error(error);
    }
  };

  const { fields, append } = useFieldArray({
    control,
    name: "reviews",
    rules: {
      validate: (value) => value.length === 5 || "You need five reviews.",
    },
  });

  const reviews: Review[] = watch("reviews");

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
    setReviewInput("");
  };

  return {
    form,
    fields,
    handleAddReview,
    reviewInput,
    setReviewInput,
    reviewIndex,
    setReviewIndex,
    successMessage,
    handleSubmit,
    submitGame
  };

}
