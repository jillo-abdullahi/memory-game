import { useState } from "react";
import { HeaderProps } from "@/types";
import { GameModal } from "@/components/GameModal";

export const Header: React.FC<HeaderProps> = ({ restartGame, newGame }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center py-6">
      <button
        className="text-blue-700 text-2xl sm:text-4xl font-bold"
        onClick={() => newGame()}
      >
        memory
      </button>

      {/* mobile view  */}
      <div className="flex sm:hidden">
        <button
          className="bg-orange hover:bg-orange-100 rounded-3.5lg py-3 px-8 text-blue-100 text-xl font-bold transition-colors duration-200"
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
        >
          Menu
        </button>
      </div>

      {/* mobile menu  */}
      <GameModal open={isMenuOpen} setOpen={setIsMenuOpen}>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-orange hover:bg-orange-100 rounded-3.5lg py-3 px-8 text-blue-100 text-lg font-bold transition-colors duration-200"
            onClick={() => {
              restartGame();
              setIsMenuOpen(false);
            }}
          >
            Restart
          </button>
          <button
            className="bg-blue-50 hover:bg-blue-400 text-blue-600 text-lg py-3 px-8 rounded-3.5lg font-bold transition-colors duration-200 hover:text-blue-100"
            onClick={() => newGame()}
          >
            New Game
          </button>
          <button
            className="bg-blue-50 hover:bg-blue-400 text-blue-600 text-lg py-3 px-8 rounded-3.5lg font-bold transition-colors duration-200 hover:text-blue-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Resume Game
          </button>
        </div>
      </GameModal>

      {/* desktop view  */}
      <div className="hidden sm:flex items-center justify-center space-x-4">
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
