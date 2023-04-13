// Description: This file contains all the types used in the application
import { Dispatch, SetStateAction } from "react";
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

export interface GameTypeSelectorProps {
  setGameTypeChosen: Dispatch<SetStateAction<boolean>>;
  setGameType: Dispatch<SetStateAction<GameType>>;
  gameType: GameType;
  setGridArray: Dispatch<SetStateAction<GridArrayItem[]>>;
}

// game board card
export interface GameBoardButtonProps {
  onClick: () => void;
  children: string | JSX.Element | null;
  isActive?: boolean;
  isRevealed?: boolean;
  isDisabled?: boolean;
}

export interface GridArrayItem {
  value: number;
  icon: string;
  isRevealed: boolean;
  isActive: boolean;
}
