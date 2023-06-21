import Board from "../../components/dashboard/dashboardColumnView/Board";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  fetchChangeBoardPosition,
  fetchChangeTaskBoard,
  fetchChangeTaskPosition,
} from "../../services/app/store";
import { StrictModeDroppable } from "../../components/ui/StrictModeDroppable";
import { changePosition } from "../../services/features/boards/boardSlice";

const borderColors = JSON.parse(localStorage.getItem("BorderColors") || "[]");

const ColumnView = () => {
  const dispatch = useAppDispatch();
  const {
    isError,
    message,
    isLoading,
    isSuccess,
    projects,
    selectedProjectId,
    test,
  } = useAppSelector((state) => state.boards);

  const projectBoards = [
    ...(projects.find((project) => project.projectId === selectedProjectId)
      ?.projectBoards ?? []),
  ];

  console.log("projectBoards :");
  console.log(projectBoards);

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result);

    if (result.destination) {
      dispatch(changePosition(result));
      const start = result.source.droppableId;
      const finish = result.destination.droppableId;
      if (result.type === "task") {
        if (start !== finish) {
          console.log("fetchChangeTaskBoard");
          dispatch(
            fetchChangeTaskBoard({
              id: result.draggableId,
              boardId: finish,
            })
          ).then(() => {
            if (result.destination)
              dispatch(
                fetchChangeTaskPosition({
                  id: result.draggableId,
                  index: result.destination.index + 1,
                })
              );
          });
        } else {
          console.log("fetchChangeTaskPosition");
          dispatch(
            fetchChangeTaskPosition({
              id: result.draggableId,
              index: result.destination.index + 1,
            })
          );
        }
      } else if (
        result.type === "column" &&
        start === "all-columns" &&
        finish === "all-columns"
      ) {
        console.log("fetchChangeBoardPosition");
        dispatch(
          fetchChangeBoardPosition({
            id: result.draggableId,
            index: projectBoards.length - result.destination.index,
          })
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable
        droppableId="all-columns"
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <div
            className="flex flex-row-reverse justify-end gap-5 w-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters
                size="2.8rem"
                color="208D8E"
                className="m-auto animate-spin"
              />
            ) : isError ? (
              <div className="m-auto text-FB0606">{`${message}`}</div>
            ) : !isSuccess ? (
              <div className="m-auto">
                پروژه‌ای را جهت نمایش اطلاعات انتخاب کنید 😃
              </div>
            ) : !projectBoards?.length ? (
              <div className="m-auto">هیچ اطلاعاتی جهت نمایش وجود ندارد ☹️</div>
            ) : (
              projectBoards?.map(({ _id, name, tasks }, index) => (
                <Board
                  key={_id}
                  index={index}
                  title={name}
                  number={tasks.length}
                  id={_id}
                  tasks={tasks}
                  borderColor={borderColors[index]}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default ColumnView;
