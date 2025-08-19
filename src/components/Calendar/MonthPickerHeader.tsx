import { Grid, IconButton, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { date } from "zod";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type MonthPickerProps = {
  startingMonth: Dayjs;
  currentDate: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
};
const MonthPicker = ({
  startingMonth,
  currentDate,
  setDate,
}: MonthPickerProps) => {
  return (
    <>
      <Grid size={1}>
        <IconButton
          disabled={startingMonth.isSame(currentDate, "month")}
          onClick={() => setDate(currentDate.subtract(1, "month"))}
        >
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }} size={5}>
        <Typography variant="h4">{currentDate.format("MMMM")}</Typography>
      </Grid>
      <Grid
        size={1}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          disabled={currentDate.isSame(dayjs(), "month")}
          onClick={() => setDate(currentDate.add(1, "month"))}
        >
          <ArrowForwardIcon></ArrowForwardIcon>
        </IconButton>
      </Grid>
    </>
  );
};

export default MonthPicker;
