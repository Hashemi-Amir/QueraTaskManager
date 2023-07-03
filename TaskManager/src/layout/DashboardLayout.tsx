import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/dashboard/dashboardHeader/Header";
import SideBar from "../components/dashboard/dashboardSidebar/SideBar";
import Button from "../components/ui/Button";
import { CgAddR } from "react-icons/cg";
import {  useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import AddNewTask from "../components/modals/Large/AddNewTask";
import { useAppDispatch, useAppSelector } from "../services/app/hook";
import SelectBoard from "../components/modals/Medium/SelectBoard";
import {
  fetchCreateTask,
  fetchSelectBoard,
  toggleMediumModal,
} from "../services/app/store";

const DashboardLayout = () => {
  const [dataList, setDataList] = useState<any>({
    data: [],
    status: "ورک اسپیس",
    selectedId: "",
  });
  const dispatch = useAppDispatch();
  const Location = useLocation();
  const { medium } = useAppSelector((state) => state.modals);
  const { selectedProject } = useAppSelector((state) => state.projects);
  const { selectedWorkSpaceHeader } = useAppSelector(
    (state) => state.workSpaces
  );

  const { projects } = useAppSelector((state) => state.boards);
  const { workSpaces } = useAppSelector((state) => state.workSpaces);

 

  // handle selected board id and modal step
  const handleSelectBoardList = async (id?: string | undefined) => {
    if (dataList.status === "ورک اسپیس") {
      const selectedWorkSpace = workSpaces.filter(
        (workspace) => workspace._id === id
      );
      const newData = selectedWorkSpace[0]?.projects;
      setDataList({ ...dataList, status: "پروژه", data: newData });
    }
    if (dataList.status === "پروژه") {
      // fetchBoards
      const projectIndex = projects.findIndex(
        (project) => project.projectId === id
      );
      if (projectIndex < 0) {
        const res = await dispatch(fetchSelectBoard(id || ""));
        setDataList({
          ...dataList,
          data: res.payload,
          status: "ستون",
        });
      } else {
        const selectedProject = projects.find(
          (project) => project.projectId === id
        );
        setDataList({
          ...dataList,
          data: selectedProject?.projectBoards,
          status: "ستون",
        });
      }
    }
    if (dataList.status === "ستون") {
      setDataList({ ...dataList, status: "تسک", selectedId: id });
    }
  };

  // handle add new task with dispatch redux toolkit
  const handleDispatchNewTask = (data: (string | undefined)[]) => {
    const [name, description, deadline] = [...data];
    const formData = {
      name,
      description,
      deadline,
      boardId: dataList.selectedId,
    };
    dispatch(fetchCreateTask(formData));
  };

  const colors = [
    "bg-F92E8F",
    "bg-118C80",
    "bg-2E7FF9",
    "bg-C074D1",
    "bg-71FDA9",
    "bg-F92E8F",
    "bg-118C80",
    "bg-2E7FF9",
    "bg-C074D1",
    "bg-71FDA9",
  ];
  const borderColors = [
    "border-t-F92E8F",
    "border-t-118C80",
    "border-t-2E7FF9",
    "border-t-C074D1",
    "border-t-71FDA9",
    "border-t-F92E8F",
    "border-t-118C80",
    "border-t-2E7FF9",
    "border-t-C074D1",
    "border-t-71FDA9",
  ];

  localStorage.setItem("Colors", JSON.stringify(colors));
  localStorage.setItem("BorderColors", JSON.stringify(borderColors));

  const commonStyle =
    "max-w-[85vw] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white gap-5 h-[calc(100%-12rem)] dark:scrollbar-track-[#0f111a] dark:scrollbar-thumb-[#3f4148]";

  let WraperClasses = "";
  // Dynamically styling different view wrapers
  if (Location.pathname === "/columnview")
    WraperClasses = `overflow-x-auto my-4 overflow-y-hidden flex ${commonStyle}  `;
  else if (Location.pathname === "/" || Location.pathname === "/listview")
    WraperClasses = `overflow-y-auto mt-4 flex ${commonStyle}`;
  else if (Location.pathname === "/calendarview")
    WraperClasses = "overflow-hidden mt-2 h-[calc(100%-14rem)]";

  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC select-none dark:bg-[#0F111A] dark:text-white">
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
          onClick={() => {
            setDataList({
              data: workSpaces,
              status: "ورک اسپیس",
              selectedId: "",
            });
            dispatch(toggleMediumModal("newTaskOnScreen"));
          }}
        >
          <CgAddR
            size={20}
            className="ml-2 rounded-md mb-[1px] dark:text-[#0F111A]"
          />
        </Button>
      </div>

      {/* handle modal new task */}
      {medium === "newTaskOnScreen" &&
        createPortal(
          <Modal>
            {dataList.status === "تسک" ? (
              <AddNewTask handleAddNewTask={handleDispatchNewTask} />
            ) : (
              <SelectBoard
                data={dataList.data}
                selectedHandle={handleSelectBoardList}
                status={dataList.status}
              />
            )}
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default DashboardLayout;
