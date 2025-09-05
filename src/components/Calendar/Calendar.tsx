import { Stack, Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react'
import { fetchDays } from '~/api/reviewdleApi';
import MonthDays from './MonthDays';
import MonthPicker from './MonthPickerHeader'; 
import WeekdayHeader from './WeekdayHeader';

type CalendarProps = {
    isAdmin?: boolean
}
const Calendar = ({isAdmin = false}: CalendarProps) => {
    const [date, setDate] = useState(dayjs());
    const startingMonth = dayjs("2025-07-01");
  
    const centeredFlex = {
      display: "flex",
      justifyContent: "center",
    };
  
    const { data: games, isLoading } = useQuery({
      queryKey: ["days", {date}],
      queryFn: () => fetchDays(date),
    });
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return (
      <>
        <Stack sx={{ ...centeredFlex, pt: 3 }} direction="column">
          <Box sx={{ ...centeredFlex, pt: 3 }}>
            <Grid height={300} width={500} container columns={7} spacing={2}>
              <Grid size={7}>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {date.format("YYYY")}
                </Typography>
              </Grid>
              <MonthPicker currentDate={date} startingMonth={startingMonth} setDate={setDate}></MonthPicker>
              <WeekdayHeader daysOfWeek={daysOfWeek}></WeekdayHeader>
              <MonthDays daysOfWeek={daysOfWeek} date={date} games={games} areGamesLoading={isLoading} isAdmin={isAdmin}></MonthDays>
            </Grid>
          </Box>
        </Stack>
      </>
    );
  };

export default Calendar