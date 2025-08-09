import { Typography, Box, Stack } from "@mui/material";
import React from "react";
import { Game } from "~/types/game";
import { GameState } from "~/types/gameState";


type ReviewdleEndgameDisplayProps = {
    game: Game;
    gameState: GameState;
}

export const ReviewdleEndgameDisplay: React.FC<ReviewdleEndgameDisplayProps> = ({ game, gameState }) => {
  return (

      <Stack direction="column" sx={{ alignItems: "center" }}>
        <Typography
          sx={{ pt: 1 }}
          variant="h3"
          color={gameState.isGameWon ? "success" : "error"}
        >
          {gameState.isGameWon ? "Congratulation" : "Game Over"}
        </Typography>
        <Typography variant="h6">
          The correct movie was {game?.movie?.title}
        </Typography>
        <img
          loading="lazy"
          src={game?.movie?.poster}
          alt="Movie Poster"
          style={{
            width: "75%",
            height: "auto",
            display: "block",
            borderRadius: "10px",
          }}
        />
      </Stack>
  );
};
