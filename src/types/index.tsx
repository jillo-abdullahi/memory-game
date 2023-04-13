// Description: This file contains all the types used in the application

// Game type selector card
export enum Theme {
  NUMBERS = "NUMBERS",
  ICONS = "ICONS",
}

export enum GridSize {
  "4x4" = "4x4",
  "6x6" = "6x6",
}

export interface GameType {
  gridSize: GridSize;
  theme: Theme;
  numberOfPlayers: number;
}

// game board card

export interface GameBoardButtonProps {
  onClick: () => void;
  children: string | JSX.Element;
  isDisabled?: boolean;
  isRevealed?: boolean;
}

export interface GridArrayItem {
  value: number;
  icon: string;
  isRevealed: boolean;
  isDisabled: boolean;
}
