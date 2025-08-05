import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import { format } from "date-fns";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Game } from "~/types/game";
import { Route } from "~/routes/archives";
import { Link } from "@tanstack/react-router";

export const Archives = () => {
  const games: Game[] = Route.useLoaderData();
  console.log(games);
  const centeredFlex = {
    display: "flex",
    justifyContent: "center",
  };
  return (
    <>
      <Stack direction="column">
        <Box sx={{ ...centeredFlex }}>
          <Typography variant="h2" gutterBottom mt={4}>
            Archive
          </Typography>
        </Box>
        <Box sx={{ ...centeredFlex }}>
          <List>
            {games
              .slice()
              .reverse()
              .map((game, index) => {
                return (
                  <ListItem
                    key={index}
                    sx={{
                      outline: "black",
                    }}
                  >
                    <ListItemButton component={Link} to={`/archives/${game.id}`}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success"></CheckCircleIcon>
                      </ListItemIcon>
                      <ListItemText>
                        {format(new Date(game.date), "yyyy-MM-dd")}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </Stack>
    </>
  );
};
