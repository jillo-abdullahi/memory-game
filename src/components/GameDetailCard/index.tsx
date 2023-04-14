export const GameDetailCard: React.FC<{
  title: string;
  children: JSX.Element;
}> = ({ title, children }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between rounded-1.5lg bg-blue-50 p-3 sm:p-6 w-full min-w-[151px] sm:min-w-[255px]">
      <div className="text-lg text-blue-500 font-bold">{title}</div>
      <div className="text-3xl text-blue-600 font-bold">{children}</div>
    </div>
  );
};
