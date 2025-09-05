import { createFileRoute } from '@tanstack/react-router'
import EditGame from '~/pages/EditGame';
import { Game } from '~/types/game';


export const Route = createFileRoute('/reviewdle/admin/edit/$gameId')({
  component: EditGame,
  loader: async ({params}) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${apiUrl}/games/${params.gameId}`);
    console.log("fethching results -> " + response)
    if (!response.ok) {
      throw new Error("Failed to load games in dataloader");
    }
    const game: Game = await response.json();
    return game;
  },
});

