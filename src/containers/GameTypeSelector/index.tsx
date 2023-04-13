import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { SelectorCardButton } from "@/components/SelectorCardButton";
import { Title } from "@/components/Title";
import { Theme, GridSize, GameType, GridArrayItem } from "@/types";

import { combineAndShuffleArray, generateArray } from "@/lib";

// game type fields.
const gameTheme = [Theme.NUMBERS, Theme.ICONS];
const gameGridSize = [GridSize["4x4"], GridSize["6x6"]];

export const GameTypeSelector: React.FC<{
  setGameTypeChosen: Dispatch<SetStateAction<boolean>>;
  setGameType: Dispatch<SetStateAction<GameType>>;
  gameType: GameType;
}> = ({ setGameTypeChosen, setGameType, gameType }) => {
  const getArray = (gridSize: GridSize) => {
    const newArray = generateArray(gridSize);
    return combineAndShuffleArray(newArray);
  };

  return (
    <div className="p-14 rounded-2.5lg bg-blue-100 space-y-8">
      {/* theme  */}
      <div>
        <Title>Select Theme</Title>
        <div className="flex justify-between items-center space-x-6">
          {gameTheme.map((theme, index) => (
            <div key={index} className="w-1/2">
              <SelectorCardButton
                isActive={gameType.theme === theme}
                onClick={() =>
                  setGameType((prevState) => ({
                    ...prevState,
                    theme: theme,
                  }))
                }
              >
                <span className="capitalize">{theme.toLowerCase()}</span>
              </SelectorCardButton>
            </div>
          ))}
        </div>
      </div>

      {/* number of players  */}
      <div>
        <Title>Number of players</Title>
        <div className="flex justify-center items-center space-x-6 ">
          {[1, 2, 3, 4].map((numberOfPlayers, index) => (
            <SelectorCardButton
              key={index}
              isActive={gameType.numberOfPlayers === numberOfPlayers}
              onClick={() =>
                setGameType((prevState) => ({
                  ...prevState,
                  numberOfPlayers: numberOfPlayers,
                }))
              }
            >
              <span className="capitalize">{numberOfPlayers}</span>
            </SelectorCardButton>
          ))}
        </div>
      </div>

      {/* Grid size  */}
      <div>
        <Title>Grid Size</Title>
        <div className="flex justify-between items-center space-x-6">
          {gameGridSize.map((gridSize, index) => (
            <div key={index} className="w-1/2">
              <SelectorCardButton
                isActive={gameType.gridSize === gridSize}
                onClick={() =>
                  setGameType((prevState) => ({
                    ...prevState,
                    gridSize: gridSize,
                  }))
                }
              >
                <span className="capitalize">{gridSize.toLowerCase()}</span>
              </SelectorCardButton>
            </div>
          ))}
        </div>
      </div>

      {/* start game CTA  */}
      <button
        className="bg-orange hover:bg-orange-100 rounded-4.5lg w-full py-4 font-bold text-2xl transition-colors duration-300"
        onClick={() => {
          // generate array of items to be displayed on the grid.
          getArray(gameType.gridSize);

          // open game board.
          setGameTypeChosen(true);
        }}
      >
        Start Game
      </button>
    </div>
  );
};
