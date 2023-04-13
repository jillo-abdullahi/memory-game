import { GameBoardButtonProps } from "@/types";

export const GameBoardButton: React.FC<GameBoardButtonProps> = ({
  isActive,
  onClick,
  isRevealed,
  children,
  isDisabled
}) => {
  const buttonStyling = isRevealed
    ? "bg-blue-300 cursor-not-allowed"
    : isActive
    ? "bg-orange"
    : "bg-blue-700";
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center overflow-hidden p-4 w-[118px] h-[118px] text-white font-bold text-4xl ${buttonStyling}`}
      disabled={isRevealed || isActive || isDisabled}
      style={{
        borderRadius: "100%",
      }}
    >
      {children}
    </button>
  );
};
