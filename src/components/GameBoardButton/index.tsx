import { GameBoardButtonProps } from "@/types";

export const Button: React.FC<GameBoardButtonProps> = ({
  isDisabled,
  onClick,
  isRevealed,
  children,
}) => {
  const buttonColor = isDisabled
    ? "bg-blue-300"
    : isRevealed
    ? "bg-orange"
    : "bg-blue-500";
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white font-bold
      ${isDisabled ? "cursor-not-allowed" : ""}}`}
    >
      {children}
    </button>
  );
};
