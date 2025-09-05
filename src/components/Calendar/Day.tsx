import {
  Button,
  Tooltip,
  ButtonBase,
  Paper,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import React, { useState } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { Game } from "~/types/game";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const navigate = useNavigate();

  const disableFuture = true;

  const [anchorEl, setAnchorEl] = useState(null);

  // Right-click handler
  const handleContextMenu = (event) => {
    event.preventDefault(); // prevent browser menu
    if (game?.id) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    if (action === "Edit") {
      navigate({ to: getToDestination() });
    }
    handleClose();
  };

  const { getItem } = useLocalStorage(`reviewdle-${game.id}`);
  console.log("game : " + JSON.stringify(game));
  const getToDestination = () => {
    if (isAdmin) {
      if (!game?.id) {
        return `/reviewdle/admin/add?date=${game?.date}`;
      } else {
        return `/reviewdle/admin/edit/${game?.id}`;
      }
    } else {
      return `/reviewdle/${game?.id}`;
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
    <>
      {isAdmin ? (
        <Tooltip disableInteractive placement="top" title={game?.movie?.title || ""}>
          <span>
            <Button
              onContextMenu={handleContextMenu}
              disabled={
                !isAdmin &&
                (!game?.id ||
                  (disableFuture && dayjs(game.date).isAfter(dayjs())))
              }
              variant="contained"
              component={Link}
              to={getToDestination()}
              sx={{
                backgroundColor: getBackgroundColor(),
                color: "white",
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
          </span>
        </Tooltip>
      ) : (
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
            color: "white",
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
      )}
      <Menu
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleMenuClick("Edit")}>
          <EditIcon color="warning" fontSize="small" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("Delete")}>
          <DeleteIcon color="error" fontSize="small" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Day;
