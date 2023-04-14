export const GameDetailCard: React.FC<{
  title: string;
  children: JSX.Element;
  isActive?: boolean;
}> = ({ title, children, isActive }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between rounded-1.5lg p-3 sm:p-4 w-full min-w-[151px] sm:min-w-[255px] ${
        isActive ? "bg-orange" : "bg-blue-50"
      }`}
    >
      <div className="text-lg text-blue-500 font-bold">{title}</div>
      <div className="text-3xl text-blue-600 font-bold">{children}</div>
    </div>
  );
};
