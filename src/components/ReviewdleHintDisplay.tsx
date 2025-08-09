import { Stack, Chip } from "@mui/material";
import { Movie } from "~/types/movie";

const hintPlacement = {
    position: "absolute",
    top: 8,
  };

type ReviewdleHintDisplayProps= {
    reviewNumberRevealed: number,
    isGameWon: boolean,
    movie: Movie | null
}
export const ReviewdleHintDisplay: React.FC<ReviewdleHintDisplayProps> = ({reviewNumberRevealed, isGameWon, movie}) => {
  return (
    <>
      <Stack
        visibility="hidden"
        sx={{
          ...hintPlacement,
          visibility:
          reviewNumberRevealed >= 3 || isGameWon ? "visible" : "hidden",
        }}
        direction="row"
      >
        {movie?.genres.map((genre) => (
          <Chip key={genre} sx={{ ml: 1 }} label={genre}></Chip>
        ))}
      </Stack>
      <Chip
        key="releaseYear"
        sx={{
          ...hintPlacement,
          right: 8,
          visibility:
          reviewNumberRevealed >= 5 || isGameWon ? "visible" : "hidden",
        }}
        label={`Release year: ${new Date(movie.releaseDate).getFullYear()}`}
      />
    </>
  );
};
