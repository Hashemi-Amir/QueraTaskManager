import TaskInfoCard from "./TaskInfoCard";
import { Task } from "../dashboard/dashboardColumnView/TaskCard";
import TaskInfoHeaderRight from "./TaskInfoHeaderRight";
import TaskInfoHeaderLeft from "./TaskInfoHeaderLeft";
import TaskInfoBodyRight from "./TaskInfoBodyRight";
import TaskInfoBodyLeft from "./TaskInfoBodyLeft";
import { useEffect } from "react";
import {
  setSelectedBoardId,
  setSelectedTaskdId,
} from "../../services/app/store";
import { useAppDispatch } from "../../services/app/hook";

type TaskInfoProps = {
  handleCloseTaskInfo: () => void;
  taskInfo: Task;
};

const TaskInfo = ({ handleCloseTaskInfo, taskInfo }: TaskInfoProps) => {
  const { comments, board, _id, description, name, deadline } = taskInfo;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSelectedBoardId(board));
    dispatch(setSelectedTaskdId(_id));
  }, [dispatch, board, _id]);

  return (
    <TaskInfoCard>
      <div className="w-full h-full divide-y divide-F4F4F4 ">
        {/* TaskInfo Header */}
        <section className="w-full  h-1/4 flex divide-x divide-F4F4F4 divide-x-reverse ">
          <TaskInfoHeaderRight />

          <TaskInfoHeaderLeft
            deadline={deadline}
            handleCloseTaskInfo={handleCloseTaskInfo}
          />
        </section>

        {/* ************************************************************ */}

        {/* TaskInfo Body */}
        <section className="w-full h-3/4 flex divide-x divide-F4F4F4 divide-x-reverse">
          <TaskInfoBodyRight description={description} name={name} />

          <TaskInfoBodyLeft comments={comments} taskId={_id} />
        </section>
      </div>
    </TaskInfoCard>
  );
};

export default TaskInfo;
