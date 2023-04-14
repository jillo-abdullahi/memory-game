import { GameDetailCard } from "@/components/GameDetailCard";

export interface MultiPlayerMovesProps {
  playerScores: number[];
  playerTurn: number;
}

export const MultiPlayerMoves: React.FC<MultiPlayerMovesProps> = ({
  playerScores,
  playerTurn,
}) => {
  return (
    <div className="flex justify-center items-center w-full space-x-8">
      {playerScores.map((score, index) => (
        <div key={index}>
          <GameDetailCard title={`Player ${index + 1}`}>
            <span>{score}</span>
          </GameDetailCard>

          <div
            className={`flex items-center justify-center text-sm mt-6 uppercase font-bold text-blue-700 transition-opacity duration-100 ${
              playerTurn === index + 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="tracking-[0.3em]">current turn</span>
          </div>
        </div>
      ))}
    </div>
  );
};
