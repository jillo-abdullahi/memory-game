import { useState, useEffect } from "react";
import Image from "next/image";
import { GameBoardButton } from "@/components/GameBoardButton";
import { GameTypeSelector } from "@/containers/GameTypeSelector";
import { Theme, GridSize, GameType, GridArrayItem } from "@/types";

export const GameBoard: React.FC = () => {
  const [gameTypeChosen, setGameTypeChosen] = useState<boolean>(false);
  const [gameType, setGameType] = useState<GameType>({
    gridSize: GridSize["4x4"],
    theme: Theme.NUMBERS,
    numberOfPlayers: 1,
  });
  const [gridArray, setGridArray] = useState<GridArrayItem[]>([]);
  const [activeCards, setActiveCards] = useState<number[]>([]);

  const activateCard = (index: number) => {
    const newArray = [...gridArray];

    // update specific item in array
    // this way, we don't change the matching pair object as well
    const updatedItem = { ...newArray[index], isActive: true };

    const updatedData = [
      ...newArray.slice(0, index),
      updatedItem,
      ...newArray.slice(index + 1),
    ];

    if (activeCards.length <= 2) {
      setActiveCards((prevState) => [...prevState, index]);
      setGridArray(updatedData);
    }
  };

  useEffect(() => {
    // compare once we have two active cards
    if (activeCards.length === 2) {
      const newArray = [...gridArray];
      const [firstCardIndex, secondCardIndex] = activeCards;
      const firstCard = newArray[firstCardIndex];
      const secondCard = newArray[secondCardIndex];
      if (firstCard.value === secondCard.value) {
        newArray[firstCardIndex].isRevealed = true;
        newArray[secondCardIndex].isRevealed = true;

        setGridArray(newArray);
        setActiveCards([]);
      } else {
        newArray[firstCardIndex].isActive = false;
        newArray[secondCardIndex].isActive = false;
        setTimeout(() => {
          setGridArray(newArray);
          setActiveCards([]);
        }, 1000);
      }
    }
  }, [activeCards]);

  return (
    <div>
      {!gameTypeChosen ? (
        <GameTypeSelector
          setGameTypeChosen={setGameTypeChosen}
          setGridArray={setGridArray}
          setGameType={setGameType}
          gameType={gameType}
        />
      ) : (
        <div className="w-full bg-blue-200">
          <div
            className={`grid gap-3 ${
              gameType.gridSize === GridSize["4x4"]
                ? "grid-cols-4 grid-rows-4"
                : "grid-cols-6 grid-rows-6"
            }`}
          >
            {gridArray.map(({ value, icon, isActive, isRevealed }, index) => {
              return (
                <GameBoardButton
                  key={index}
                  onClick={() => {
                    activateCard(index);
                  }}
                  isDisabled={activeCards.length === 2}
                  isActive={isActive}
                  isRevealed={isRevealed}
                >
                  {!isActive && !isRevealed ? null : gameType.theme ===
                    Theme.NUMBERS ? (
                    value.toString()
                  ) : (
                    <Image
                      src={`/images/icon-${icon}.svg`}
                      width={50}
                      height={50}
                      alt=""
                    />
                  )}
                </GameBoardButton>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
