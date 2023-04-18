import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import moment, { Duration, Moment } from "moment";
import { GameBoard } from "@/containers/GameBoard";
import { Header } from "@/components/Header";
import { GameModal } from "@/components/GameModal";
import { Theme, GridSize, GameType, GridArrayItem } from "@/types";
import { SinglePlayerMoves } from "@/components/SinglePlayerMoves";
import { MultiPlayerMoves } from "@/components/MultiPlayerMoves";
import { GameDetailCard } from "@/components/GameDetailCard";
import { PlayerScore } from "@/types";

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
  const [cardsRevealed, setCardsRevealed] = useState<number>(0);

  // multi player
  const [playerTurn, setPlayerTurn] = useState<number>(1);
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
  const [gameWinners, setGameWinners] = useState<number[]>([]);

  const initializeScoreBoard = useCallback((): void => {
    setPlayerScores(
      [...Array(gameType.numberOfPlayers)].map((_, i) => ({
        id: i + 1,
        score: 0,
      }))
    );
  }, [gameType.numberOfPlayers]);

  // start player turns and scores tracking for multiplayer
  useEffect(() => {
    if (!gameTypeChosen || gameType.numberOfPlayers === 1) return;
    initializeScoreBoard();
  }, [gameType.numberOfPlayers, gameTypeChosen, initializeScoreBoard]);

  const resetGame = (): void => {
    if (gameType.numberOfPlayers === 1) {
      setMoves(0);
      setStartTime(moment());
    } else {
      initializeScoreBoard();
      setPlayerTurn(1);
      setGameWinners([]);
    }
    setGameEnd(false);
  };

  // only reset the active cards
  const restartGame = (): void => {
    setActiveCards([]);
    setGridArray(
      gridArray.map((item) => ({
        ...item,
        isRevealed: false,
        isActive: false,
      }))
    );
    resetGame();
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
    resetGame();
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
    if (!gameTypeChosen || gameType.numberOfPlayers === 1) return;
    if (gridArray.length === cardsRevealed) {
      setGameEnd(true);
      setGameWinners(
        findGameWinners(playerScores.map((playerScore) => playerScore.score))
      );
      setGameEndModalOpen(true);
    }
  }, [
    gridArray,
    cardsRevealed,
    gameTypeChosen,
    playerScores,
    gameType.numberOfPlayers,
  ]);

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

  return (
    <>
      <Head>
        <title>Memory</title>
        <meta name="description" content="a multi-player memory game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
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
          setMoves={setMoves}
          startTime={startTime}
          setStartTime={setStartTime}
          gameEnd={gameEnd}
          setPlayerScores={setPlayerScores}
          playerScores={playerScores}
          setPlayerTurn={setPlayerTurn}
          playerTurn={playerTurn}
          setCardsRevealed={setCardsRevealed}
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

        {/* game modal for when the game ends */}
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
                          playerScores.find(
                            (player) => player.score === gameWinners[0]
                          )?.id
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
                {playerScores
                  .sort((a, b) => b.score - a.score)
                  .map(({ id, score }, index) => (
                    <div key={index}>
                      <GameDetailCard
                        winnerMode={gameWinners.includes(score)}
                        title={`Player ${id} ${
                          gameWinners.includes(score) ? `(Winner!)` : ""
                        }`}
                      >
                        <span>{`${score} ${
                          score > 1 ? "Pairs" : "Pair"
                        }`}</span>
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
