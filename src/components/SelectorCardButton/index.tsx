export const SelectorCardButton: React.FC<{
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
