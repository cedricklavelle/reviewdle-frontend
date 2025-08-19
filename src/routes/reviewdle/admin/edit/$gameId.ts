import { createFileRoute } from '@tanstack/react-router'
import AddGame from '~/pages/AddGame'
import { Game } from '~/types/game';

export const Route = createFileRoute('/reviewdle/admin/edit/$gameId')({
  component: AddGame,
  loader: async ({params}) => {
    const response = await fetch(`http://localhost:3005/games/reviewdle/${params.gameId}`);
    if (!response.ok) {
      throw new Error("Failed to load games");
    }
    const game: Game = await response.json();
    return game;
  },
})
