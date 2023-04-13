import Head from "next/head";
import { useState } from "react";
import { GameBoard } from "@/containers/GameBoard";
import { Header } from "@/components/Header";
import {
  Theme,
  GridSize,
  GameType,
  GridArrayItem,
} from "@/types";

export default function Home() {
  const [gameTypeChosen, setGameTypeChosen] = useState<boolean>(false);

  const [gameType, setGameType] = useState<GameType>({
    gridSize: GridSize["4x4"],
    theme: Theme.NUMBERS,
    numberOfPlayers: 1,
  });
  const [gridArray, setGridArray] = useState<GridArrayItem[]>([]);
  const [activeCards, setActiveCards] = useState<number[]>([]);

  // only reset the active cards
  const restartGame = (): void => {
    setActiveCards([]);
    const resetGameArray = gridArray.map((item) => {
      return { ...item, isRevealed: false, isActive: false };
    });
    setGridArray(resetGameArray);
  };

  // clear everything and start a new game
  const newGame = (): void => {
    setGameTypeChosen(false);
    setGameType({
      gridSize: GridSize["4x4"],
      theme: Theme.NUMBERS,
      numberOfPlayers: 1,
    });
    setGridArray([]);
  };
  return (
    <>
      <Head>
        <title>Memory</title>
        <meta name="description" content="a multi-player memory game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`w-full h-full min-h-screen flex flex-col items-center font-atkinson space-y-20 ${
          gameTypeChosen ? "bg-blue-200" : "bg-blue-700"
        }
        ${gameTypeChosen ? "justify-start" : "justify-center"}`}
      >
        {gameTypeChosen ? (
          <div className="w-full max-w-[1110px]">
            <Header restartGame={restartGame} newGame={newGame} />
          </div>
        ) : null}
        <GameBoard
          gameTypeChosen={gameTypeChosen}
          setGameTypeChosen={setGameTypeChosen}
          gameType={gameType}
          setGameType={setGameType}
          gridArray={gridArray}
          setGridArray={setGridArray}
          activeCards={activeCards}
          setActiveCards={setActiveCards}
        />
      </div>
    </>
  );
}
