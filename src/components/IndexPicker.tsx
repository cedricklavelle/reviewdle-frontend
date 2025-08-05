import { Button } from "@mui/material";
import React from "react";

type IndexPickerProps = {
  handleIndexClick: (index: number) => void;
  reviewIndex: number;
  maxDisplayedHint?: number;
  disableButton?: boolean | null;
  winningIndex?: number | null
};
export const IndexPicker: React.FC<IndexPickerProps> = ({
  handleIndexClick,
  reviewIndex,
  maxDisplayedHint = 5,
  disableButton = false,
  winningIndex
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
          color={winningIndex === index ? "success" : "primary"}
          sx={{
            height: '40px',
            padding: '6px 16px',
            minWidth: '64px',
            fontSize: reviewIndex === index ? "24px" : "",
            fontWeight: reviewIndex === index ? "bold" : "",
            border: reviewIndex === index ? "2px solid white": ""
          }}
        >
          {index}
        </Button>
      ))}
    </>
  );
};
