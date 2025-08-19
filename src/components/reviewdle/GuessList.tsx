import React from 'react'
import { Guess } from '~/types/gameState'
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

type ReviewdleGuessDisplayProps = {
    guesses: Guess[]
}
export const ReviewdleGuessDisplay: React.FC<ReviewdleGuessDisplayProps> = ({guesses}) => {
  return (
    <List>
    {guesses
      .slice()
      .reverse()
      .map((guess, index) => {
        const IconComponent = guess.guessSuccess
          ? CheckCircleIcon
          : HighlightOffIcon;
        const iconColor = guess.guessSuccess
          ? "success.main"
          : "error.main";

        return (
          <ListItem
            key={index}
            sx={{
              bgcolor: "background.paper",
              outline: "black",
            }}
          >
            <ListItemIcon sx={{ color: iconColor }}>
              <IconComponent />
            </ListItemIcon>
            <ListItemText>{guess.guessName}</ListItemText>
          </ListItem>
        );
      })}
  </List>
  )
}
