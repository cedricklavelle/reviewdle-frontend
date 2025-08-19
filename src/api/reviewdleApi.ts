import { Dayjs } from "dayjs";
import { date } from "zod";
import { Game } from "~/types/game";

export const fetchDays = async (date: Dayjs) => {
    const firstDayOffMonth = date.startOf("month");
    const lastDayOfMonth = date.endOf("month");
    const response = await fetch(
      `http://localhost:3005/games/reviewdleDateRange?startDate=${firstDayOffMonth.format("YYYY-MM-DD")}&endDate=${lastDayOfMonth.format("YYYY-MM-DD")}`
    );
    const games: Game[] = await response.json();
    const days = [];
    for (let i = 0; i < date.daysInMonth(); i++) {
      const dayDate = date.startOf("month").add(i, "day").format("YYYY-MM-DD");

      const game = games.find((e) => e.date === dayDate);
      days.push({
        date: dayDate,
        id: game?.id,
      });
    }
    if (!response.ok) {
      throw new Error("Get days request failed");
    }
    return days;
  };