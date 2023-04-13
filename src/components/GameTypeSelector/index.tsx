import { useState } from "react";

export enum Theme {
  NUMBERS = "NUMBERS",
  ICONS = "ICONS",
}

export enum GridSize {
  "4x4" = "4x4",
  "6x6" = "6x6",
}

interface GameType {
  gridSize: GridSize;
  theme: Theme;
  numberOfPlayers: 1 | 2 | 3 | 4 | number;
}

// game type fields.
const gameTheme = [Theme.NUMBERS, Theme.ICONS];
const gameGridSize = [GridSize["4x4"], GridSize["6x6"]];

const SelectorCardButton: React.FC<{
  children: string | JSX.Element;
  onClick: () => void;
  isActive?: boolean;
}> = ({ children, onClick, isActive }) => {
  const bgColor = isActive ? "bg-blue-700" : "bg-slate-300";
  return (
    <button
      className={`px-4 w-full py-2 rounded-3.5lg font-bold text-2xl min-w-119 transition-colors duration-300 ${bgColor} ${
        !isActive && "hover:bg-blue-400"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const GameTypeSelector: React.FC = ({}) => {
  const [gameType, setGameType] = useState<GameType>({
    gridSize: GridSize["4x4"],
    theme: Theme.NUMBERS,
    numberOfPlayers: 1,
  });

  const Title: React.FC<{ children: string }> = ({ children }) => (
    <p className="text-blue-500 mb-4 sm:text-xl sm:font-bold">{children}</p>
  );
  return (
    <div className="p-14 rounded-2.5lg bg-blue-100 space-y-8">
      {/* theme  */}
      <div>
        <Title>Select Theme</Title>
        <div className="flex justify-between items-center space-x-6">
          {gameTheme.map((theme, index) => (
            <div key={index} className="w-1/2">
              <SelectorCardButton
                isActive={gameType.theme === theme}
                onClick={() =>
                  setGameType((prevState) => ({
                    ...prevState,
                    theme: theme,
                  }))
                }
              >
                <span className="capitalize">{theme.toLowerCase()}</span>
              </SelectorCardButton>
            </div>
          ))}
        </div>
      </div>

      {/* number of players  */}
      <div>
        <Title>Number of players</Title>
        <div className="flex justify-center items-center space-x-6 ">
          {[1, 2, 3, 4].map((numberOfPlayers, index) => (
            <SelectorCardButton
              key={index}
              isActive={gameType.numberOfPlayers === numberOfPlayers}
              onClick={() =>
                setGameType((prevState) => ({
                  ...prevState,
                  numberOfPlayers: numberOfPlayers,
                }))
              }
            >
              <span className="capitalize">{numberOfPlayers}</span>
            </SelectorCardButton>
          ))}
        </div>
      </div>

      {/* Grid size  */}
      <div>
        <Title>Grid Size</Title>
        <div className="flex justify-between items-center space-x-6">
          {gameGridSize.map((gridSize, index) => (
            <div key={index} className="w-1/2">
              <SelectorCardButton
                isActive={gameType.gridSize === gridSize}
                onClick={() =>
                  setGameType((prevState) => ({
                    ...prevState,
                    gridSize: gridSize,
                  }))
                }
              >
                <span className="capitalize">{gridSize.toLowerCase()}</span>
              </SelectorCardButton>
            </div>
          ))}
        </div>
      </div>

      {/* start game CTA  */}
      <button className="bg-orange hover:bg-orange-100 rounded-4.5lg w-full py-4 font-bold text-2xl transition-colors duration-300">
        Start Game
      </button>
    </div>
  );
};
