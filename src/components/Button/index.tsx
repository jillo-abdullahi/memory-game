import { Children } from "react";

export enum ButtonType {
  CIRCULAR = "CIRCULAR",
  RECTANGULAR = "RECTANGULAR",
}

interface ButtonProps {
  onClick: () => void;
  buttonType?: ButtonType;
  children: string | JSX.Element;
  isDisabled?: boolean;
  isRevealed?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  isDisabled,
  onClick,
  isRevealed,
  children,
  buttonType,
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
