import Head from "next/head";
import { useState, useEffect } from "react";
import moment, { Duration, Moment } from "moment";
import { GameBoard } from "@/containers/GameBoard";
import { Header } from "@/components/Header";
import { GameModal } from "@/components/GameModal";
import { Theme, GridSize, GameType, GridArrayItem } from "@/types";
import { SinglePlayerMoves } from "@/components/SinglePlayerMoves";

export default function Home() {
  const [gameTypeChosen, setGameTypeChosen] = useState<boolean>(false);

  const [gameType, setGameType] = useState<GameType>({
    gridSize: GridSize["4x4"],
    theme: Theme.NUMBERS,
    numberOfPlayers: 1,
  });
  const [gridArray, setGridArray] = useState<GridArrayItem[]>([]);
  const [activeCards, setActiveCards] = useState<number[]>([]);

  // moves counter
  const [moves, setMoves] = useState<number>(0);
  // time elapsed
  const [startTime, setStartTime] = useState<Moment>(moment());
  const [timeElapsed, setTimeElapsed] = useState<Duration>(moment.duration());

  // only reset the active cards
  const restartGame = (): void => {
    setActiveCards([]);
    setStartTime(moment());
    setMoves(0);
    const resetGameArray = gridArray.map((item) => {
      return { ...item, isRevealed: false, isActive: false };
    });
    setGridArray(resetGameArray);
  };

  // clear everything and start a new game
  const newGame = (): void => {
    setGameTypeChosen(false);
    setMoves(0);
    setGameType({
      gridSize: GridSize["4x4"],
      theme: Theme.NUMBERS,
      numberOfPlayers: 1,
    });
    setGridArray([]);
  };

  // get time elapsed since game start
  useEffect(() => {
    if (!gameTypeChosen) return;
    const interval = setInterval(() => {
      const now = moment();
      setTimeElapsed(moment.duration(now.diff(startTime)));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, gameTypeChosen]);

  if (timeElapsed) {
    console.log(timeElapsed.seconds());
  }

  return (
    <>
      <Head>
        <title>Memory</title>
        <meta name="description" content="a multi-player memory game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`w-full h-full min-h-screen flex flex-col items-center font-atkinson space-y-20 px-6 ${
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
          moves={moves}
          setMoves={setMoves}
          startTime={startTime}
          setStartTime={setStartTime}
          timeElapsed={timeElapsed}
        />

        {/* moves counter for single player  */}
        {gameType.numberOfPlayers === 1 && gameTypeChosen && (
          <div className="w-full">
            <SinglePlayerMoves moves={moves} timeElapsed={timeElapsed} />
          </div>
        )}

        {/* multiplayer score tracker  */}
      </div>
    </>
  );
}
