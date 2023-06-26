import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/dashboard/dashboardHeader/Header";
import SideBar from "../components/dashboard/dashboardSidebar/SideBar";
import Button from "../components/ui/Button";
import { CgAddR } from "react-icons/cg";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import AddNewTask from "../components/modals/Large/AddNewTask";
import { useAppDispatch, useAppSelector } from "../services/app/hook";
import CloseIcon from "../components/ui/Close";
import SelectBoard from "../components/modals/Medium/SelectBoard";
import { fetchCreateTask } from "../services/app/store";

type BoardType = {
  _id: string;
  name: string;
};

type BoardsState = {
  boardList: BoardType[];
  boardStep: string;
  boardId: string;
};

const DashboardLayout = () => {
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [boards, setBoards] = useState<BoardsState>({
    boardList: [],
    boardStep: "select",
    boardId: "",
  });
  const dispatch = useAppDispatch();
  const Location = useLocation();

  const { selectedProject } = useAppSelector((state) => state.projects);
  const { selectedWorkSpaceHeader } = useAppSelector(
    (state) => state.workSpaces
  );

  const { projects, selectedProjectId } = useAppSelector(
    (state) => state.boards
  );

  // handle modal new task and get boards
  const handleNewTaskModal = () => {
    if (projects.length > 0) {
      const projectIndex = projects.findIndex(
        (project) => project.projectId === selectedProjectId
      );
      const allBoards: BoardType[] = projects[projectIndex].projectBoards.map(
        (board) => board
      );
      setBoards({ ...boards, boardList: allBoards });
    }

    // toggle new task modal
    setNewTaskModal(!newTaskModal);
  };

  // handle selected board id and modal step
  const handleSelectBoardList = (boardId: string) => {
    setBoards({ ...boards, boardStep: "new", boardId: boardId });
  };

  // handle add new task with dispatch redux toolkit
  const handleDispatchNewTask = (data: (string | undefined)[]) => {
    data.push(boards.boardId);
    const [name, description, boardId] = [...data];
    const formData = {
      name,
      description,
      boardId,
      deadline: "2023-05-16T12:52:24.483+00:00",
    };
    dispatch(fetchCreateTask(formData));
    setNewTaskModal(false);
  };

  const colors = [
    "bg-F92E8F",
    "bg-F1A25C",
    "bg-118C80",
    "bg-2E7FF9",
    "bg-C074D1",
    "bg-71FDA9",
    "bg-FFE605",
    "bg-F92E8F",
    "bg-F1A25C",
    "bg-118C80",
    "bg-2E7FF9",
    "bg-C074D1",
    "bg-71FDA9",
    "bg-FFE605",
  ];
  const borderColors = [
    "border-t-F92E8F",
    "border-t-F1A25C",
    "border-t-118C80",
    "border-t-2E7FF9",
    "border-t-C074D1",
    "border-t-71FDA9",
    "border-t-FFE605",
    "border-t-F92E8F",
    "border-t-F1A25C",
    "border-t-118C80",
    "border-t-2E7FF9",
    "border-t-C074D1",
    "border-t-71FDA9",
    "border-t-FFE605",
  ];


  localStorage.setItem("Colors", JSON.stringify(colors));
  localStorage.setItem("BorderColors", JSON.stringify(borderColors));

  const commonStyle =
    "max-w-[85vw] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white gap-5 h-[calc(100%-12rem)]";

  let WraperClasses = "";
  // Dynamically styling different view wrapers
  if (Location.pathname === "/columnview")
    WraperClasses = `overflow-x-auto my-4 overflow-y-hidden flex ${commonStyle}  `;
  else if (Location.pathname === "/" || Location.pathname === "/listview")
    WraperClasses = `overflow-y-auto mt-4 flex ${commonStyle}`;
  else if (Location.pathname === "/calendarview")
    WraperClasses = "overflow-hidden mt-2 h-[calc(100%-14rem)]";

  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC">
      <SideBar />
      <div className="w-4/5 pr-4 pl-10 min-h-screen">
        {/* Header */}

        <Header
          projectName={
            Location.pathname === "/columnview"
              ? selectedProject
              : Location.pathname === "/listview"
              ? selectedWorkSpaceHeader
              : ""
          }
        />
        {/* Without Classes for calander view */}
        <div className={`${WraperClasses} relative`}>
          <Outlet />
        </div>
      </div>
      <div className="fixed left-5 bottom-3 cur z-45">
        <Button
          className="text-l px-2 py rounded-lg"
          value={"تسک جدید"}
          onClick={handleNewTaskModal}
        >
          <CgAddR
            size={20}
            color="white"
            className="ml-2 rounded-md mb-[1px]"
          />
        </Button>
      </div>

      {/* handle modal new task */}
      {newTaskModal &&
        createPortal(
          <Modal>
            {projects.length > 0 ? (
              <>
                {boards.boardStep === "select" ? (
                  <SelectBoard
                    boardList={boards.boardList}
                    handleAllSideMoreModals={handleNewTaskModal}
                    handleSelectBoardList={handleSelectBoardList}
                  />
                ) : (
                  <AddNewTask
                    handleAddNewTask={handleDispatchNewTask}
                    handleNewTaskModal={handleNewTaskModal}
                  />
                )}
              </>
            ) : (
              <div className="modal-box w-3/4 max-w-lgl">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="my-modal-3"
                    className="text-323232 cursor-pointer"
                    onClick={() => handleNewTaskModal()}
                  >
                    <CloseIcon />
                  </label>

                  <div className="font-semibold text-2xl text-black"></div>

                  <span></span>
                </div>
                <div className="font-semibold flex flex-col text-black text-center ">
                  <span className="text-2xl">پروژه ای پیدا نشد !</span>
                  <span className="pt-5 text-sm "> یه پروژه انتخاب کن</span>
                </div>
              </div>
            )}
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default DashboardLayout;
