import { GameBoardButtonProps, GridSize } from "@/types";

export const GameBoardButton: React.FC<GameBoardButtonProps> = ({
  isActive,
  onClick,
  isRevealed,
  children,
  isDisabled,
  gridSize,
}) => {
  const buttonStyling = isRevealed
    ? "bg-blue-300 cursor-not-allowed"
    : isActive
    ? "bg-orange"
    : "bg-blue-700";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-full overflow-hidden p-4 transition-colors duration-200 text-white font-bold text-4xl ${buttonStyling} ${
        gridSize === GridSize["4x4"]
          ? "w-[72px] h-[72px] sm:w-[118px] sm:h-[118px] lg:w-[96px] lg:h-[96px]"
          : "w-[46px] h-[46px] sm:w-[82px] sm:h-[82px] lg:w-[62px] lg:h-[62px]"
      }
      ${!isRevealed && !isActive && "hover:bg-blue-400"}`}
      disabled={isRevealed || isActive || isDisabled}
    >
      {children}
    </button>
  );
};
