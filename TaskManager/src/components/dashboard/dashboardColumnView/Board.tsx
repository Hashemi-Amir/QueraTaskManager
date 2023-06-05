import Header from "../dashboardColumnView/Header";
import TaskCard from "./TaskCard";

import { Task } from "../../../pages/dashboard/ColumnView";

type BoardProps = {
  title: string;
  borderColor: string;
  number: string;
  id: number;
  tasks: Task[];
};

const Board = ({ title, borderColor, number, tasks }: BoardProps) => {
  return (
    <div className="min-w-[250px] h-fit max-h-[80vh] overflow-y-auto flex-shrink scrollbar-none pb-16">
      {/* Sticky Header */}
      <Header title={title} borderColor={borderColor} number={number} />

      {/* Task Cards */}
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default Board;
