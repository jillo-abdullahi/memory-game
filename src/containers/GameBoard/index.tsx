import { useState } from "react";
import { GameTypeSelector } from "@/containers/GameTypeSelector";
import { Theme, GridSize, GameType } from "@/types";

export const GameBoard: React.FC = ({}) => {
  const [gameTypeChosen, setGameTypeChosen] = useState<boolean>(false);
  const [gameType, setGameType] = useState<GameType>({
    gridSize: GridSize["4x4"],
    theme: Theme.NUMBERS,
    numberOfPlayers: 1,
  });

  return (
    <div>
      {!gameTypeChosen ? (
        <GameTypeSelector
          setGameTypeChosen={setGameTypeChosen}
          setGameType={setGameType}
          gameType={gameType}
        />
      ) : (
        <div>Game Board</div>
      )}
    </div>
  );
};
