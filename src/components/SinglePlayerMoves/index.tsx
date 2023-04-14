import { SinglePlayerMovesProps } from "@/types";

export const SinglePlayerMoves: React.FC<SinglePlayerMovesProps> = ({
  timeElapsed,
  moves,
}) => {
  return (
    <div className="flex justify-center items-center w-full space-x-8">
      <div className="flex flex-col sm:flex-row items-center justify-between rounded-1.5lg bg-blue-50 p-3 sm:p-6 w-[151px] sm:w-[255px]">
        <div className="text-lg text-blue-500 font-bold">Time</div>
        <div className="text-3xl text-blue-600 font-bold">{`${
          timeElapsed.minutes()
        }:${timeElapsed.seconds().toString().padStart(2,'0')}`}</div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between rounded-1.5lg bg-blue-50 p-3 sm:p-6 w-[151px] sm:w-[255px]">
        <div className="text-lg text-blue-500 font-bold">Moves</div>
        <div className="text-3xl text-blue-600 font-bold">{moves}</div>
      </div>
    </div>
  );
};
