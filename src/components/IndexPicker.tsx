import { Button } from "@mui/material";
import React from "react";

type IndexPickerProps = {
  handleIndexClick: (index: number) => void;
  reviewIndex: number;
  maxDisplayedHint?: number;
  disableButton?: boolean | null;
};
export const IndexPicker: React.FC<IndexPickerProps> = ({
  handleIndexClick,
  reviewIndex,
  maxDisplayedHint = 5,
  disableButton = false,
}) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((index) => (
        <Button
          key={index}
          onClick={() => handleIndexClick(index)}
          variant="contained"
          value={reviewIndex}
          disabled={(maxDisplayedHint ?? 0) < index && !disableButton}
          color={reviewIndex === index ? "secondary" : "primary"}
        >
          {index}
        </Button>
      ))}
    </>
  );
};
