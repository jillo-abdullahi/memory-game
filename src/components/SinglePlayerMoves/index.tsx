import { SinglePlayerMovesProps } from "@/types";
import { GameDetailCard } from "@/components/GameDetailCard";

export const SinglePlayerMoves: React.FC<SinglePlayerMovesProps> = ({
  timeElapsed,
  moves,
}) => {
  return (
    <div className="flex justify-center items-center w-full space-x-8">
      <GameDetailCard title="Time">
        <span>{`${timeElapsed.minutes()}:${timeElapsed
          .seconds()
          .toString()
          .padStart(2, "0")}`}</span>
      </GameDetailCard>
      <GameDetailCard title="Moves">
        <span>{moves}</span>
      </GameDetailCard>
    </div>
  );
};
