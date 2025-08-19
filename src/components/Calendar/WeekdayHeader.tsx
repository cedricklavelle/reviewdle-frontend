import { Grid, Paper, Typography } from "@mui/material";

const WeekdayHeader = ({ daysOfWeek }: { daysOfWeek: string[] }) => {
  return (
    <>
      {daysOfWeek.map((day, index) => (
        <Grid size={1}>
          <Paper key={index}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                width: 60,
                height: 30,
              }}
              variant="h6"
            >
              {day}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </>
  );
};

export default WeekdayHeader;
