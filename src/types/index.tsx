// Description: This file contains all the types used in the application
import { Duration, Moment } from "moment";
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
  setStartTime: Dispatch<SetStateAction<Moment>>;
}

// game board card
export interface GameBoardButtonProps {
  onClick: () => void;
  children: string | JSX.Element | null;
  isActive?: boolean;
  isRevealed?: boolean;
  isDisabled?: boolean;
  gridSize: GridSize;
}

export interface GridArrayItem {
  value: number;
  icon: string;
  isRevealed: boolean;
  isActive: boolean;
}

export interface GameBoardProps {
  gameTypeChosen: boolean;
  setGameTypeChosen: Dispatch<SetStateAction<boolean>>;
  gameType: GameType;
  setGameType: Dispatch<SetStateAction<GameType>>;
  gridArray: GridArrayItem[];
  setGridArray: Dispatch<SetStateAction<GridArrayItem[]>>;
  activeCards: number[];
  setActiveCards: Dispatch<SetStateAction<number[]>>;
  moves: number;
  setMoves: Dispatch<SetStateAction<number>>;
  startTime: Moment;
  setStartTime: Dispatch<SetStateAction<Moment>>;
  timeElapsed: Duration;
}

export interface HeaderProps {
  restartGame(): void;
  newGame(): void;
}

export interface SinglePlayerMovesProps {
  moves: number;
  timeElapsed: Duration;
}
