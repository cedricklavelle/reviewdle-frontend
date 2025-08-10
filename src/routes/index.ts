import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { Home } from "~/pages/Home";

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: Home,
});
