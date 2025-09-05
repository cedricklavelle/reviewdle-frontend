import { createFileRoute } from '@tanstack/react-router'
import { Game as GamePage } from '~/pages/Game'
import { Game } from '~/types/game';
import { Movie } from '~/types/movie';

export const Route = createFileRoute('/reviewdle/$gameId')({
  component: GamePage,
  loader: async ({params}) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${apiUrl}/games/${params.gameId}`);
    if (!response.ok) {
      throw new Error("Failed to load games");
    }
    const game: Game = await response.json();
    return game;
  },
})



