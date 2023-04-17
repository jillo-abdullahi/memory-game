import Head from "next/head";
import { useState, useEffect } from "react";
import moment, { Duration, Moment } from "moment";
import { GameBoard } from "@/containers/GameBoard";
import { Header } from "@/components/Header";
import { GameModal } from "@/components/GameModal";
import { Theme, GridSize, GameType, GridArrayItem } from "@/types";
import { SinglePlayerMoves } from "@/components/SinglePlayerMoves";
import { MultiPlayerMoves } from "@/components/MultiPlayerMoves";
import { GameDetailCard } from "@/components/GameDetailCard";

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

  // game end
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [gameEndModalOpen, setGameEndModalOpen] = useState<boolean>(false);

  // multi player
  const [playerTurn, setPlayerTurn] = useState<number>(1);
  const [playerScores, setPlayerScores] = useState<number[]>([]);
  const [gameWinners, setGameWinners] = useState<number[]>([]);

  // start player turns and scores tracking for multiplayer
  useEffect(() => {
    if (!gameTypeChosen || gameType.numberOfPlayers === 1) return;
    setPlayerScores(Array(gameType.numberOfPlayers).fill(0));
  }, [gameType.numberOfPlayers, gameTypeChosen]);

  const resetGame = (): void => {
    setMoves(0);
    setGameEnd(false);
    setPlayerScores([]);
    setPlayerTurn(1);
  };

  console.log({ gameType });

  // only reset the active cards
  const restartGame = (): void => {
    setActiveCards([]);
    setStartTime(moment());
    resetGame();
    const resetGameArray = gridArray.map((item) => {
      return { ...item, isRevealed: false, isActive: false };
    });
    setGridArray(resetGameArray);
  };

  // clear everything and start a new game
  const newGame = (): void => {
    setGameTypeChosen(false);
    resetGame();
    setGameType({
      gridSize: GridSize["4x4"],
      theme: Theme.NUMBERS,
      numberOfPlayers: 1,
    });
    setGridArray([]);
  };

  // get time elapsed since game start
  useEffect(() => {
    if (!gameTypeChosen || gameEnd || gameType.numberOfPlayers > 1) return;
    const interval = setInterval(() => {
      const now = moment();
      setTimeElapsed(moment.duration(now.diff(startTime)));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, gameTypeChosen, gameEnd, gameType.numberOfPlayers]);

  // end game if all cards are revealed
  useEffect(() => {
    if (!gameTypeChosen) return;
    const allCardsRevealed = gridArray.every(
      (item) => item.isRevealed === true
    );

    if (allCardsRevealed) {
      setGameEnd(true);
      setGameEndModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridArray]);

  const findGameWinners = (scores: number[]) => {
    let winners = [0];
    for (const score of scores) {
      if (score > winners[0]) {
        // there's one winner
        winners = [score];
      } else if (score === winners[0]) {
        // in case there's more than one winner
        winners.push(score);
      }
    }
    return winners;
  };

  // check game winner when the game ends
  useEffect(() => {
    if (!gameEnd || gameType.numberOfPlayers === 1) return;
    setGameWinners(findGameWinners(playerScores));
  }, [gameEnd, gameType.numberOfPlayers, playerScores]);

  return (
    <>
      <Head>
        <title>Memory</title>
        <meta name="description" content="a multi-player memory game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`w-full h-full min-h-screen flex flex-col items-center justify-between font-atkinson px-6 pb-8 ${
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
          setGameEnd={setGameEnd}
          gameEnd={gameEnd}
          setPlayerScores={setPlayerScores}
          setPlayerTurn={setPlayerTurn}
          playerTurn={playerTurn}
        />

        {/* moves counter for single player  */}
        {gameType.numberOfPlayers === 1 && gameTypeChosen && (
          <div className="w-full max-w-[327px] sm:max-w-[654px]">
            <SinglePlayerMoves moves={moves} timeElapsed={timeElapsed} />
          </div>
        )}

        {/* moves counter for multi player */}
        {gameType.numberOfPlayers > 1 && gameTypeChosen && (
          <div className="w-full max-w-[327px] sm:max-w-[1110px]">
            <MultiPlayerMoves
              playerScores={playerScores}
              playerTurn={playerTurn}
            />
          </div>
        )}

        {/* game modal for when the game ends for single players */}
        <GameModal
          open={gameEndModalOpen}
          setOpen={setGameEndModalOpen}
          borderRadius="rounded-2.5lg"
        >
          <div className="flex flex-col items-center justify-between space-y-6">
            {/* game over text  */}
            <div className="w-full text-center">
              <h1 className="text-blue-700 font-bold text-2xl sm:text-5xl mb-2">
                {gameType.numberOfPlayers === 1 && "You did it!"}
                {gameType.numberOfPlayers > 1 &&
                  `${
                    gameWinners.length > 1
                      ? "It's a tie!"
                      : `Player ${
                          playerScores.indexOf(gameWinners[0]) + 1
                        } wins!`
                  }`}
              </h1>
              <h2 className="text-blue-500 font-bold text-sm sm:text-lg">
                {gameType.numberOfPlayers > 1
                  ? "Game over! Here are the results..."
                  : "Game over! Here's how you got on..."}
              </h2>
            </div>

            {/* game details  */}
            {gameType.numberOfPlayers > 1 ? (
              <div className="flex flex-col space-y-2 w-full">
                {playerScores.map((score, index) => (
                  <div key={index}>
                    <GameDetailCard
                      winnerMode={gameWinners.includes(score)}
                      title={`Player ${index + 1} ${
                        gameWinners.includes(score) ? `(Winner!)` : ""
                      }`}
                    >
                      <span>{`${score} Pairs`}</span>
                    </GameDetailCard>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-col space-y-2 w-full">
                  <GameDetailCard title="Time Elapsed">
                    <span>{`${timeElapsed.minutes()}:${timeElapsed
                      .seconds()
                      .toString()
                      .padStart(2, "0")}`}</span>
                  </GameDetailCard>
                  <GameDetailCard title="Moves Taken">
                    <span>{moves}</span>
                  </GameDetailCard>
                </div>
              </>
            )}
            {/* CTA buttons  */}
            <div className="w-full flex flex-col sm:flex-row space-y-4 space-x-0 sm:space-x-4 sm:space-y-0">
              <button
                className="bg-orange w-full sm:w-1/2 hover:bg-orange-100 rounded-3.5lg py-3 px-8 text-blue-100 text-lg font-bold transition-colors duration-200"
                onClick={() => {
                  restartGame();
                  setGameEndModalOpen(false);
                }}
              >
                Restart
              </button>
              <button
                className="bg-blue-50 w-full sm:w-1/2 hover:bg-blue-400 text-blue-600 text-lg py-3 px-8 rounded-3.5lg font-bold transition-colors duration-200 hover:text-blue-100"
                onClick={() => {
                  newGame();
                  setGameEndModalOpen(false);
                }}
              >
                Setup New Game
              </button>
            </div>
          </div>
        </GameModal>
      </div>
    </>
  );
}
