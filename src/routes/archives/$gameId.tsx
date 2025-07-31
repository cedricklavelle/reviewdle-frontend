import { createFileRoute } from '@tanstack/react-router'
import { Game as GamePage } from '~/pages/Game'
import { Game } from '~/types/game';
import { Movie } from '~/types/movie';

export const Route = createFileRoute('/archives/$gameId')({
  component: GamePage,
  loader: async ({params}) => {
    const response = await fetch(`http://localhost:3005/games/reviewdle/${params.gameId}`);
    if (!response.ok) {
      throw new Error("Failed to load games");
    }
    const game: Game = await response.json();
    return game;
  },
})



