import { createFileRoute } from "@tanstack/react-router";
import { loadmovie } from "~/data/loadmovie";
import { Game } from "~/pages/Game";

export const Route = createFileRoute("/daily/")({
  component: Game,
  loader: () => loadmovie(),
});
