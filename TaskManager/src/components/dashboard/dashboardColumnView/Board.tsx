import Header from "../dashboardHeader/Header";
import TaskCard from "./TaskCard";

const Board = () => {
  return (
    <div className="min-w-[250px] h-fit max-h-[80vh] bg-red-500 overflow-y-auto flex-shrink scrollbar-none pb-5">
      {/* Sticky Header */}
      <Header title={'Pending'} borderColor="F98F2E" number={"۰"} />
      {/* Task Cards */}
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default Board;
