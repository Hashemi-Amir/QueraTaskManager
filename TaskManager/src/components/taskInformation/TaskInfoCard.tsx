interface TaskInfoCardProps {
  children: React.ReactNode;
  // onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const TaskInfoCard = ({ children }: TaskInfoCardProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-40 ">
      <div className=" fixed top-0 left-0 flex items-center justify-center z-30 w-full h-full">
        <div className="w-11/12 h-3/4 bg-white dark:bg-[#15202b] rounded-2xl p-8 relative overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TaskInfoCard;
