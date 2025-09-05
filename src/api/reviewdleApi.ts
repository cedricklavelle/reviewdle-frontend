import { Dayjs } from "dayjs";
import { Game } from "~/types/game";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
export const fetchDays = async (date: Dayjs) => {
  const firstDayOffMonth = date.startOf("month");
  const lastDayOfMonth = date.endOf("month");
  console.log( "environment : " + import.meta.env.MODE);
  console.log("apiurl : " + apiUrl)
  const requestUrl =  `${apiUrl}/games?from=${firstDayOffMonth.format("YYYY-MM-DD")}&to=${lastDayOfMonth.format("YYYY-MM-DD")}`
  const response = await fetch(
    requestUrl
  );

  const games: Game[] = await response.json();
  console.log(JSON.stringify(games))
  const days = [];
  for (let i = 0; i < date.daysInMonth(); i++) {
    const dayDate = date.startOf("month").add(i, "day").format("YYYY-MM-DD");

    const game = games.find((e) => 
      e.date?.slice(0, 10) === dayDate.slice(0, 10)
    );
    days.push({
      date: dayDate,
      id: game?.id,
      movie: {
        title: game?.movie?.title
      }
    });
  }

  if (!response.ok) {
    throw new Error("Get days request failed");
  }
  console.log(requestUrl)
  console.log(days)
  return days;
};


export const createReviewdleGame = async (game: Game) => {
  const payload = {
    name: game.name,
    date: game.date,
    movieId: game.movie?.id,
    reviews: game.reviews,
  };

  console.log("about to fetch");
  const response = await fetch(`${apiUrl}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.status === 409) {
    return;
  }

  if (!response.ok) {
    console.log(response)
    console.log("payload : " + JSON.stringify(payload))
    throw new Error("Failed to submit");
  }

}

export const updateReviewdleGame = async (game: Game, gameId: number) => {
  const payload = {
    name: game.name,
    date: game.date,
    movieId: game.movie?.id,
    reviews: game.reviews,
  };

  console.log("about to fetch");
  const response = await fetch(`${apiUrl}/games/${gameId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.status === 409) {
    return;
  }

  if (!response.ok) {
    throw new Error("Failed to submit");
  }

}


export const checkGameExists = async (date: string) => {
  console.log("about to fetch");
  const response = await fetch(
    `${apiUrl}/games/exists/${date}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;

}