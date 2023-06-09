import Header from "../dashboardColumnView/Header";
import TaskCard from "./TaskCard";

type Task = {
  _id: string;
  name: string;
  description: string;
  label: [];
  board: string;
  taskTags: string[];
  taskAssigns: string[];
  comments: string[];
  position: number;
  deadline?: string;
};
type BoardProps = {
  title: string;
  number: number;
  id: string;
  borderColor: string;
  tasks: Task[];
};

const Board = ({ title, number, tasks, borderColor }: BoardProps) => {
console.log(borderColor);

  return (
    <div className="min-w-[250px] h-fit max-h-[80vh] overflow-y-auto flex-shrink scrollbar-none pb-16">
      {/* Sticky Header */}
      <Header title={title} number={number} borderColor={borderColor} />

      {/* Task Cards */}
      {tasks.map(({ name, description, _id }) => (
        <TaskCard
          key={_id}
          name={name}
          description={description}
          _id={_id}
          label={[]}
          board={""}
          taskAssigns={[]}
          comments={[]}
          position={0}
        />
      ))}
    </div>
  );
};

export default Board;
