
import { createFileRoute } from "@tanstack/react-router";
import { Archives } from "~/pages/Archives";


export const Route = createFileRoute("/archives/")({
  component: Archives,
});
