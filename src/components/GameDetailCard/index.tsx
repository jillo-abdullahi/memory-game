export const GameDetailCard: React.FC<{
  title: string;
  children: JSX.Element;
  isActive?: boolean;
  winnerMode?: boolean;
}> = ({ title, children, isActive, winnerMode }) => {
  return (
    <div
      className={`relative flex flex-col sm:flex-row items-center justify-between rounded-1.5lg p-3 sm:p-4 w-full min-w-[151px] sm:min-w-[255px] ${
        winnerMode ? "bg-blue-600" : isActive ? "bg-orange" : "bg-blue-50"
      }`}
    >
      <div
        className={`text-lg font-bold ${
          winnerMode || isActive ? "text-blue-100" : "text-blue-500 "
        }`}
      >
        {title}
      </div>
      <div
        className={`text-3xl  font-bold ${
          winnerMode || isActive ? "text-blue-100" : "text-blue-600"
        }`}
      >
        {children}
      </div>

      {isActive && (
        <div className="absolute left-0 right-0 mx-auto w-10 h-10 -top-2 rotate-45 bg-orange"></div>
      )}
    </div>
  );
};
