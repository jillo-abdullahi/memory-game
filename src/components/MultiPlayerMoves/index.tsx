import { useMediaQuery } from "react-responsive";
import { GameDetailCard } from "@/components/GameDetailCard";
import { PlayerScore } from "@/types";

export interface MultiPlayerMovesProps {
  playerScores: PlayerScore[];
  playerTurn: number;
}

export const MultiPlayerMoves: React.FC<MultiPlayerMovesProps> = ({
  playerScores,
  playerTurn,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div className="flex justify-center items-center w-full space-x-6 sm:space-x-8">
      {playerScores
        .sort((a, b) => a.id - b.id)
        .map(({ id, score }, index) => (
          <div key={index}>
            <GameDetailCard
              title={`${isTabletOrMobile ? `P${id}` : `Player ${id}`} `}
              isActive={playerTurn === id}
            >
              <span>{score}</span>
            </GameDetailCard>

            <div
              className={`flex items-center justify-center text-sm mt-6 uppercase font-bold text-blue-700 transition-opacity duration-100 ${
                playerTurn === id ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="tracking-[0.3em] text-center hidden md:block">
                current turn
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};
