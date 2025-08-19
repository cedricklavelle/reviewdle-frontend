import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { date } from "zod";
import Day from "./Day";
import { Dayjs } from "dayjs";
import { Game } from "~/types/game";


type MonthDaysProps = {
    daysOfWeek: string[];
    date: Dayjs;
    games: Game[];
    areGamesLoading: boolean;
    isAdmin: boolean;
}
const MonthDays = ({daysOfWeek, date, games, areGamesLoading, isAdmin}: MonthDaysProps) => {
  return (
    <>
      {[...Array(daysOfWeek.indexOf(date.startOf("month").format("ddd")))].map(
        (_, i) => (
          <Grid size={1}></Grid>
        )
      )}

      {areGamesLoading
        ? [...Array(date.daysInMonth())]?.map((_, index) => (
            <Grid key={index} size={1}>
              <Day
                game={{
                  date: date.set("date", index + 1).format("YYYY-MM-DD"),
                }}
              />
            </Grid>
          ))
        : games?.map((game) => (
            <Grid key={game.id} size={1}>
              <Day game={game} isAdmin={isAdmin} />
            </Grid>
          ))}
    </>
  );
};

export default MonthDays;
