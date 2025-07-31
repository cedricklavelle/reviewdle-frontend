
import { createFileRoute } from "@tanstack/react-router";
import { Archives } from "~/pages/Archives";
import { Game } from "~/types/game";

export const Route = createFileRoute("/archives/")({
  loader: async () => {
    const response = await fetch("http://localhost:3005/games/reviewdle");
    if (!response.ok) {
      throw new Error("Failed to load games");
    }
    const games: Game[] = await response.json();
    return games;
  },
  component: Archives,
});
