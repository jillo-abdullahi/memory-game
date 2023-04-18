import { useEffect } from "react";
import Image from "next/image";
import { GameBoardButton } from "@/components/GameBoardButton";
import { GameTypeSelector } from "@/containers/GameTypeSelector";
import { GameBoardProps, GridSize, PlayerScore, Theme } from "@/types";
import { useMediaQuery } from "react-responsive";

export const GameBoard: React.FC<GameBoardProps> = ({
  gameTypeChosen,
  setGameTypeChosen,
  gameType,
  setGameType,
  gridArray,
  setGridArray,
  activeCards,
  setActiveCards,
  setMoves,
  setStartTime,
  gameEnd,
  setPlayerTurn,
  playerTurn,
  setPlayerScores,
  playerScores,
}) => {
  const isShortScreen = useMediaQuery({ query: "(max-height: 930px)" });

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
      const newGridArray = [...gridArray];
      if (gridArray[activeCards[0]].value === gridArray[activeCards[1]].value) {
        for (const cardIndex of activeCards) {
          newGridArray[cardIndex].isRevealed = true;
        }
        setGridArray(newGridArray);

        // reset and wait for next turn
        setActiveCards([]);

        // keep track of single player moves
        if (gameType.numberOfPlayers === 1) {
          setMoves((prevState) => prevState + 1);
        } else {
          changePlayerTurn();
        }

        // set current player score
        if (gameType.numberOfPlayers > 1) {
          // find player and index
          const player = playerScores.find(
            (player: PlayerScore) => player.id === playerTurn
          );
          const playerIndex = playerScores.findIndex(
            (player: PlayerScore) => player.id === playerTurn
          );

          // update player score
          if (player) {
            player.score++;
            setPlayerScores((prevState) => [
              ...prevState.slice(0, playerIndex),
              { ...player },
              ...prevState.slice(playerIndex + 1),
            ]);
          }
        }
      } else {
        setTimeout(() => {
          for (const cardIndex of activeCards) {
            newGridArray[cardIndex].isActive = false;
          }
          setGridArray(newGridArray);
          setActiveCards([]);
          if (gameType.numberOfPlayers === 1) {
            setMoves((prevState) => prevState + 1);
          } else {
            changePlayerTurn();
          }
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCards, gameType.numberOfPlayers]);

  const changePlayerTurn = () => {
    if (gameEnd || activeCards.length < 2 || gameType.numberOfPlayers === 1)
      return;
    setPlayerTurn((prevState) => {
      if (prevState === gameType.numberOfPlayers) {
        return 1;
      }
      return prevState + 1;
    });
  };

  return (
    <div>
      {!gameTypeChosen ? (
        <>
          <div className="text-blue-100 text-2xl sm:text-4xl font-bold w-full text-center mt-[4.8rem] mb-[2.8rem] sm:mb-[4.8rem]">
            memory
          </div>
          <GameTypeSelector
            setGameTypeChosen={setGameTypeChosen}
            setGridArray={setGridArray}
            setGameType={setGameType}
            gameType={gameType}
            setStartTime={setStartTime}
          />
        </>
      ) : (
        <div className="w-full bg-blue-200">
          <div
            className={`grid ${
              gameType.gridSize === GridSize["4x4"]
                ? "grid-cols-4 grid-rows-4"
                : "grid-cols-6 grid-rows-6"
            } ${isShortScreen ? "gap-3" : "gap-5"}`}
          >
            {gridArray.map(({ value, icon, isActive, isRevealed }, index) => {
              return (
                <GameBoardButton
                  key={index}
                  gridSize={gameType.gridSize}
                  onClick={() => {
                    activateCard(index);
                  }}
                  isDisabled={activeCards.length === 2}
                  isActive={isActive}
                  isRevealed={isRevealed}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div
                      className={`absolute top-0 left-0 transition-opacity w-full h-full flex items-center justify-center duration-200 ${
                        gameType.theme === Theme.NUMBERS &&
                        (isActive || isRevealed)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      {value.toString()}
                    </div>
                    <div
                      className={`absolute top-0 left-0  w-full h-full flex items-center justify-center transition-opacity duration-200 ${
                        gameType.theme === Theme.ICONS &&
                        (isActive || isRevealed)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        src={`/images/icon-${icon}.svg`}
                        width={gameType.gridSize === GridSize["4x4"] ? 56 : 40}
                        height={gameType.gridSize === GridSize["4x4"] ? 56 : 40}
                        alt=""
                      />
                    </div>
                  </div>
                </GameBoardButton>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
