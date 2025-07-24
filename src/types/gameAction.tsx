type GameAction =
  | { type: "SUBMIT" }
  | { type: "SKIP" }
  | { type: "SET_INPUT"; input: string }
  | { type: "SET_DISPLAY_INDEX"; indexNumber: number };