import { Typography } from "@mui/material";
import React from "react";
import { Review } from "~/types/review";

type ReviewdleReviewDisplayProps = {
  reviews?: Review[];
  index: number;
};
export const ReviewdleReviewDisplay: React.FC<ReviewdleReviewDisplayProps> = ({
  reviews,
  index,
}) => {
  return (
    <Typography
      sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
      variant="h6"
    >
      {reviews
        ? (reviews.find((review: Review) => review.hintNumber === index)
            ?.reviewText ?? `No review yet for hint #${index}`)
        : "No reviews available"}
    </Typography>
  );
};
