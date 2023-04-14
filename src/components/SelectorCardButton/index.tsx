export const SelectorCardButton: React.FC<{
  children: string | JSX.Element;
  onClick: () => void;
  isActive?: boolean;
}> = ({ children, onClick, isActive }) => {
  const bgColor = isActive ? "bg-blue-600" : "bg-blue-300";
  return (
    <button
      className={`px-6 w-full py-3 rounded-3.5lg font-bold text-base sm:text-2xl min-w-[3.8rem] transition-colors duration-300 ${bgColor} ${
        !isActive && "hover:bg-blue-400"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
