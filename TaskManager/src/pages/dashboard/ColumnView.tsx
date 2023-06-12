import Board from "../../components/dashboard/dashboardColumnView/Board";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { changeTaskPosition } from "../../services/app/store";

const ColumnView = () => {
  const { isError, message, isLoading, isSuccess, projects, selectedId } =
    useAppSelector((state) => state.boards);
  const borderColors = JSON.parse(localStorage.getItem("BorderColors") || "[]");
  const projectBoards = projects.find(
    (project) => project.projectId === selectedId
  )?.projectBoards;

  const dispatch = useAppDispatch();

  const handleOnDragEnd = (result: DropResult) => {
    if (result.destination) {
      dispatch(changeTaskPosition(result));
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {isLoading ? (
        <AiOutlineLoading3Quarters
          size="2.8rem"
          color="208D8E"
          className="m-auto animate-spin"
        />
      ) : !isSuccess ? (
        <div className="m-auto">
          پروژه‌ای را جهت نمایش اطلاعات انتخاب کنید 😃
        </div>
      ) : !projectBoards?.length ? (
        <div className="m-auto">هیچ اطلاعاتی جهت نمایش وجود ندارد ☹️</div>
      ) : (
        projectBoards.map(({ _id, name, tasks }, index) => (
          <Board
            key={_id}
            title={name}
            number={tasks.length}
            id={_id}
            tasks={tasks}
            borderColor={borderColors[index]}
          />
        ))
      )}
      {isError && <div className="m-auto text-FB0606">{`${message}`}</div>}
    </DragDropContext>
  );
};

export default ColumnView;
