import Board from "../../components/dashboard/dashboardColumnView/Board";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { changeTaskPosition, createBoard } from "../../services/app/store";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ColumnView = () => {
  const {
    isError,
    message,
    isLoading,
    isSuccess,
    projects,
    selectedProjectId,
  } = useAppSelector((state) => state.boards);
  const borderColors = JSON.parse(localStorage.getItem("BorderColors") || "[]");
  const projectBoards = projects.find(
    (project) => project.projectId === selectedProjectId
  )?.projectBoards;

  const dispatch = useAppDispatch();

  // modal
  const [newBoardState, setNewBoardState] = useState("show");
  const location = useLocation();
  const handleNewBoard = () => {
    const boardName =
      document.querySelector<HTMLInputElement>("#newBoardName")?.value;
    if (boardName?.trim()) {
      const formData: (string | undefined)[] = [boardName, selectedProjectId];
      dispatch(createBoard(formData));
      setNewBoardState("show");
    }
  };

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
        <div className="absolute w-full h-full flex justify-center items-center z-0">
          پروژه‌ای را جهت نمایش اطلاعات انتخاب کنید 😃
        </div>
      ) : !projectBoards?.length ? (
        <div className="absolute w-full h-full flex justify-center items-center z-0 ">
        هیچ اطلاعاتی جهت نمایش وجود ندارد ☹️
        </div>
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

      {/* add new board button */}
      {location.pathname === "/columnview" && projectBoards?.length != undefined ? (
        <div className="sticky top-0 right-0 flex items-center justify-between min-w-[250px] bg-white h-10 rounded px-3 py-2 mb-5 border border-t-2 border-t-208D8E text-1E1E1E shadow-[0px_2px_8px_rgba(0,0,0,0.18)] cursor-pointer">
          {newBoardState === "show" ? (
            <span
              className="flex items-center gap-2"
              onClick={() => setNewBoardState("edit")}
            >
              ساختن برد جدید
              <span className="text-208D8E">
                <AiOutlinePlus />
              </span>
            </span>
          ) : (
            <div className="flex items-center justify-around">
              <input
                type="text"
                className="w-2/3 h-3/4 focus:outline-none text-sm px-1"
                placeholder="نام برد جدید"
                id="newBoardName"
              />
              <button
                className="focus:outline-none  text-sm"
                onClick={() => setNewBoardState("show")}
              >
                لغو
              </button>
              <button
                className="bg-208D8E text-white rounded-md p-2 mr-3 focus:outline-none text-xs"
                onClick={handleNewBoard}
              >
                تایید
              </button>
            </div>
          )}
        </div>
      ):
      ''
    
    }
    </DragDropContext>
  );
};

export default ColumnView;
