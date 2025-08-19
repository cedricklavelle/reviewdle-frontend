import { Button, ButtonBase, Paper, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import React from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { Game } from "~/types/game";

type DayProps = {
  game?: Game | undefined;
  dayNumber?: number | undefined;
  isAdmin: boolean;
};
const Day: React.FC<DayProps> = ({ game, dayNumber, isAdmin }) => {
  const centeredFlex = {
    display: "flex",
    justifyContent: "center",
  };

  const disableFuture = true;

  const { getItem } = useLocalStorage(`reviewdle-${game.id}`);

  const getToDestination = () => {
    if(isAdmin){
        if(!game?.id){
            return `/reviewdle/admin/add`
        }
        else{
            return `/reviewdle/admin/edit/${game?.id}`
        }
    }
    else {
        return `/reviewdle/${game?.id}`
    }
  };

  const getBackgroundColor = () => {
    const item = getItem();
    const hasGameId =
      game != null &&
      game.id != null &&
      (typeof game.id === "number"
        ? !Number.isNaN(game.id)
        : String(game.id).trim().length > 0);

    switch (true) {
      case isAdmin && hasGameId:
        return "secondary.main";
      case !item || (!item.isGameWon && !item.isGameLost):
        return "background.paper";
      case item.isGameWon:
        return "success.main";
      case item.isGameLost:
        return "error.main";
      default:
        return "background.paper";
    }
  };
  return (
    <Button
      disabled={
        !isAdmin &&
        (!game?.id || (disableFuture && dayjs(game.date).isAfter(dayjs())))
      }
      variant="contained"
      component={Link}
      to={getToDestination()}
      sx={{
        backgroundColor: getBackgroundColor(),
        color: "White",
        fontSize: "1rem",
        minWidth: "60px",
        minHeight: "35px",
        border:
          dayjs(game?.date).format("YYYY-MM-DD") ===
          dayjs().format("YYYY-MM-DD")
            ? "1px "
            : "",
      }}
    >
      {game?.date ? dayjs(game.date).format("D") : dayNumber}
    </Button>
  );
};

export default Day;
