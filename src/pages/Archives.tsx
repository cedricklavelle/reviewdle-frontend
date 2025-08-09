import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import "dayjs/locale/de";
import { Game } from "~/types/game";
import dayjs, { Dayjs } from "dayjs";
import Day from "~/components/Calendar/Day";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const Archives = () => {
  const [date, setDate] = useState(dayjs());
  const firstDayOffMonth = date.startOf("month");
  const lastDayOfMonth = date.endOf("month");

  const startingMonth = dayjs("2025-07-01");


  const centeredFlex = {
    display: "flex",
    justifyContent: "center",
  };


  const fetchDays = async (startDate: Dayjs, endDate: Dayjs) => {
    const response = await fetch(
      `http://localhost:3005/games/reviewdleDateRange?startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format("YYYY-MM-DD")}`
    );
    const games: Game[] = await response.json();
    const days = [];
    for (let i = 0; i < date.daysInMonth(); i++) {
      const dayDate = date.startOf("month").add(i, "day").format("YYYY-MM-DD");

      const game = games.find((e) => e.date === dayDate);
      days.push({
        date: dayDate,
        id: game?.id,
      });
    }
    if (!response.ok) {
      throw new Error("Get days request failed");
    }
    return days;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["days", { firstDayOffMonth, lastDayOfMonth }],
    queryFn: () => fetchDays(firstDayOffMonth, lastDayOfMonth),
  });

  const games = data;
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <Stack sx={{ ...centeredFlex, pt: 3 }} direction="column">
        <Box sx={{ ...centeredFlex, pt: 3 }}>
          <Grid height={300} width={500} container columns={7} spacing={2}>
            <Grid size={6}></Grid>
            <Grid size={1}>
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {date.format("YYYY")}
              </Typography>
            </Grid>
            <Grid size={1}>
              <IconButton
disabled={startingMonth.isSame(date, "month")}
                onClick={() => setDate(date.subtract(1, "month"))}
              >
                <ArrowBackIcon></ArrowBackIcon>
              </IconButton>
            </Grid>
            <Grid sx={{ ...centeredFlex }} size={5}>
              <Typography variant="h4">{date.format("MMMM")}</Typography>
            </Grid>
            <Grid
              size={1}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                disabled={date.isSame(dayjs(), "month")}
                onClick={() => setDate(date.add(1, "month"))}
              >
                <ArrowForwardIcon></ArrowForwardIcon>
              </IconButton>
            </Grid>
            {daysOfWeek.map((day, index) => (
              <Grid size={1}>
                <Paper key={index}>
                  <Typography
                    sx={{ ...centeredFlex, width: 60, height: 30 }}
                    variant="h6"
                  >
                    {day}
                  </Typography>
                </Paper>
              </Grid>
            ))}
            {[...Array(daysOfWeek.indexOf(firstDayOffMonth.format("ddd")))].map(
              (_, i) => (
                <Grid size={1}></Grid>
              )
            )}

            {isLoading
              ? [...Array(date.daysInMonth())]?.map((_ ,index) => (
                  <Grid key={index} size={1}>
                    <Day
                      game={ {
                        date: date.set('date', index + 1).format("YYYY-MM-DD")
                      }}
                    />
                  </Grid>
                ))
              : games?.map((game) => (
                  <Grid key={game.id} size={1}>
                    <Day game={game} />
                  </Grid>
                ))}
          </Grid>{" "}
        </Box>
      </Stack>
    </>
  );
};
