import { Button, ButtonBase, Paper, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import React from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { Game } from "~/types/game";

type DayProps = {
    game?: Game | undefined;
    dayNumber?: number | undefined;
}
const Day: React.FC<DayProps> = ({ game, dayNumber }) => {
    const centeredFlex = {
        display: "flex",
        justifyContent: "center",
      };

      const disableFuture = true;

      const {getItem} = useLocalStorage(`reviewdle-${game.id}`);

    const getBackgroundColor = () => {
        if (!getItem() || (!getItem().isGameWon && !getItem().isGameLost)){
            return("background.paper")
        }
        else if (getItem().isGameWon){
            return("success.main")
        }
        else if (getItem().isGameLost){
            return("error.main")
        }
    }
  return (
    <Button disabled={!game?.id || disableFuture && dayjs(game.date).isAfter(dayjs())} variant="contained" component={Link}
    to={`/archives/${game?.id}`} sx={{
        backgroundColor: getBackgroundColor(),
        color: "White",
        fontSize: "1rem",
        minWidth: "60px",
        minHeight:"35px",
        border: dayjs(game?.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") ? "1px " : ""
    }}>
        {game?.date ? dayjs(game.date).format("D"): dayNumber}
    </Button>
  );
};

export default Day;
