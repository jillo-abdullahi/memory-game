import { HeaderProps } from "@/types";

export const Header: React.FC<HeaderProps> = ({ restartGame, newGame }) => {
  return (
    <div className="flex justify-between items-center py-6">
      <button className="text-blue-700 text-2xl sm:text-4xl font-bold">
        memory
      </button>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-orange hover:bg-orange-100 rounded-3.5lg py-3 px-8 text-blue-100 text-xl font-bold transition-colors duration-200"
          onClick={() => restartGame()}
        >
          Restart
        </button>
        <button
          className="bg-blue-50 hover:bg-blue-400 text-blue-700 text-xl py-3 px-8 rounded-3.5lg font-bold transition-colors duration-200 hover:text-blue-100"
          onClick={() => newGame()}
        >
          New Game
        </button>
      </div>
    </div>
  );
};
