import Board from "../../components/dashboard/dashboardColumnView/Board";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  fetchChangeBoardPosition,
  fetchChangeTaskBoard,
  fetchChangeTaskPosition,
  createBoard,
} from "../../services/app/store";
import { StrictModeDroppable } from "../../components/ui/StrictModeDroppable";
import { changePosition } from "../../services/features/boards/boardSlice";
import { useState } from "react";

const ColumnView = () => {
  const borderColors = JSON.parse(localStorage.getItem("BorderColors") || "[]");

  const dispatch = useAppDispatch();
  const {
    isError,
    message,
    isLoading,
    isSuccess,
    projects,
    searchedTask,
    searchedTaskValue,
    selectedProjectId,
  } = useAppSelector((state) => state.boards);

  const projectBoards = [
    ...(searchedTaskValue
      ? searchedTask
      : projects.find((project) => project.projectId === selectedProjectId)
          ?.projectBoards ?? []),
  ].sort((b, a) => a.position - b.position);

  // modal
  const [newBoardState, setNewBoardState] = useState("show");
  const handleNewBoard = () => {
    const boardName =
      document.querySelector<HTMLInputElement>("#newBoardName")?.value;
    if (boardName?.trim()) {
      const formData: (string | undefined)[] = [boardName, selectedProjectId];
      dispatch(createBoard(formData));
      setNewBoardState("show");
    }
  };
  const newBoard = (
    <div className="sticky  top-0 right-0 flex items-center justify-between min-w-[250px] bg-white h-10 rounded px-3 py-2 mb-5 border border-t-2 border-t-black text-1E1E1E shadow-[0px_2px_8px_rgba(0,0,0,0.18)] dark:bg-[#0c0e15] dark:text-[#F7F9F9] dark:border-[#F1B127] dark:shadow-[0px_3px_10px_rgba(255,255,255,0.15)] ">
      {newBoardState === "show" ? (
        <span
          className="flex items-center gap-2  cursor-pointer"
          onClick={() => setNewBoardState("edit")}
        >
          ساختن ستون جدید
          <span className="text-208D8E dark:text-[#F7F9F9]">
            <AiOutlinePlus />
          </span>
        </span>
      ) : (
        <div className="flex items-center justify-around">
          <input
            type="text"
            className="w-2/3 h-3/4 focus:outline-none text-sm px-1 dark:bg-transparent"
            placeholder="نام ستون جدید"
            id="newBoardName"
          />
          <button
            className="focus:outline-none  text-sm"
            onClick={() => setNewBoardState("show")}
          >
            لغو
          </button>
          <button
            className="text-208D8E mr-3 focus:outline-none text-sm dark:text-[#F1B127]"
            onClick={handleNewBoard}
          >
            تایید
          </button>
        </div>
      )}
    </div>
  );

  const handleOnDragEnd = (result: DropResult) => {
    if (result.destination) {
      // Dispatch action to update task/column positions
      dispatch(changePosition(result));

      const start = result.source.droppableId;
      const finish = result.destination.droppableId;

      if (result.type === "task") {
        if (start !== finish) {
          // If the task is dragged to a different board dispatch a fetch request to update the board it belongs to
          dispatch(
            fetchChangeTaskBoard({
              id: result.draggableId,
              boardId: finish,
            })
          ).then(() => {
            // Once the board has been updated, dispatch another fetch request to update the task's position within the board
            if (result.destination)
              dispatch(
                fetchChangeTaskPosition({
                  id: result.draggableId,
                  index: result.destination.index + 1,
                })
              );
          });
        } else {
          // If the task is not dragged to a different board, only update its position within the same board
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
        // If the column is dragged within the same list, update its position within the list based on the index
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
            className="flex flex-row-reverse justify-end gap-5 "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {isLoading ? (
              <div className="absolute w-full h-full flex justify-center items-center z-0">
                <AiOutlineLoading3Quarters
                  size="2.8rem"
                  color="208D8E"
                  className="animate-spin"
                />
              </div>
            ) : isError ? (
              <div className="absolute w-full h-full flex justify-center items-center z-0 text-FB0606">{`${message}`}</div>
            ) : !isSuccess || !selectedProjectId ? (
              <div className="absolute w-full h-full flex justify-center items-center z-0">
                پروژه‌ای را جهت نمایش اطلاعات انتخاب کنید 😃
              </div>
            ) : !projectBoards?.length  ? (
              <>
                <div className="absolute w-full h-full flex justify-center items-center z-0">
                  هیچ اطلاعاتی جهت نمایش وجود ندارد ☹️
                </div>
                {!searchedTaskValue && newBoard}
              </>
            ) : (
              <>
                {!searchedTaskValue && newBoard}
                {projectBoards?.map(({ _id, name, tasks }, index) => (
                  <Board
                    key={_id}
                    index={index}
                    title={name}
                    number={tasks.length}
                    id={_id}
                    tasks={tasks}
                    borderColor={borderColors[index]}
                  />
                ))}
              </>
            )}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default ColumnView;
