import { Droppable } from "react-beautiful-dnd";
import Header from "../dashboardColumnView/Header";
import TaskCard from "./TaskCard";
import { Task } from "../../../services/features/boards/boardSlice";

type BoardProps = {
  title: string;
  number: number;
  id: string;
  borderColor: string;
  tasks: Task[];
};

const Board = ({ title, number, tasks, borderColor, id }: BoardProps) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className="min-w-[250px] h-fit max-h-[80vh] overflow-y-auto flex-shrink scrollbar-none pb-16"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {/* Sticky Header */}
          <Header title={title} number={number} borderColor={borderColor} />

          {tasks.map(
            ({ name, description, _id, position, comments, deadline }) => (
              <TaskCard
                position={position}
                key={_id}
                name={name}
                description={description}
                deadline={deadline}
                _id={_id}
                label={[]}
                board={id}
                taskAssigns={[]}
                comments={comments}
              />
            )
          )}
          {provided.placeholder}
          {/* Task Cards */}
        </div>
      )}
    </Droppable>
  );
};

export default Board;
