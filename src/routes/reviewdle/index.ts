
import { createFileRoute } from "@tanstack/react-router";
import { UserCalendar } from "~/pages/UserCalendar";



export const Route = createFileRoute("/reviewdle/")({
  component: UserCalendar,
});
