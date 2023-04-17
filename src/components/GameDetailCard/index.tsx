import { useMediaQuery } from "react-responsive";

export const GameDetailCard: React.FC<{
  title: string;
  children: JSX.Element;
  isActive?: boolean;
  winnerMode?: boolean;
}> = ({ title, children, isActive, winnerMode }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div
      className={`relative h-full flex flex-col  sm:flex-row  items-center justify-between rounded-1.5lg  px-3 py-4 sm:px-8 sm:py-4 md:p-4 w-full min-w-[64px] sm:min-w-[155px] ${
        winnerMode ? "bg-blue-600" : isActive ? "bg-orange" : "bg-blue-50"
      }`}
    >
      <div
        className={`text-sm sm:text-lg font-bold z-10 ${
          winnerMode || isActive ? "text-blue-100" : "text-blue-500 "
        }`}
      >
        <span>{title}</span>
      </div>
      <div
        className={`text-2xl sm:text-3xl  font-bold ${
          winnerMode || isActive ? "text-blue-100" : "text-blue-600"
        }`}
      >
        {children}
      </div>

      {isActive && (
        <div
          className={`absolute left-0 right-0 mx-auto -top-2 rotate-45 bg-orange z-0 ${
            isTabletOrMobile ? "w-4 h-4 " : "w-10 h-10 "
          }`}
        ></div>
      )}
    </div>
  );
};
