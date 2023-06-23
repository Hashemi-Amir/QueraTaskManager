import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/dashboard/dashboardHeader/Header";
import SideBar from "../components/dashboard/dashboardSidebar/SideBar";
import Button from "../components/ui/Button";
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import AddNewTask from "../components/modals/Large/AddNewTask";
import { useAppDispatch, useAppSelector } from "../services/app/hook";
import SelectBoard from "../components/modals/Medium/SelectBoard";
import { fetchBoards, fetchCreateTask } from "../services/app/store";

type BoardType = {
  _id: string;
  name: string;
};

type DataListState = {
  data: BoardType[];
  status: string;
  selectedId: string;
};

const DashboardLayout = () => {
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [dataList, setDataList] = useState<any>({
    data: [],
    status: "ورک اسپیس",
    selectedId: "",
  });
  const Location = useLocation();
  const dispatch = useAppDispatch();
  const { selectedProject } = useAppSelector((state) => state.projects);
  const { selectedWorkSpaceHeader } = useAppSelector(
    (state) => state.workSpaces
  );

  const { projects, selectedProjectId ,isSuccess } = useAppSelector(
    (state) => state.boards
  );
  const { workSpaces } = useAppSelector(
    (state) => state.workSpaces
  );
    
  // handle modal new task and get boards
  const handleNewTaskModal = () => {
    // if (projects.length > 0) {
    //   const projectIndex = projects.findIndex(
    //     (project) => project.projectId === selectedProjectId
    //   );
    //   const allBoards: BoardType[] = projects[projectIndex].projectBoards.map(
    //     (board) => board
    //   );
    //   setDataList({ ...boards, boardList: allBoards });
    // }

    // toggle new task modal
    setNewTaskModal(!newTaskModal);
  };

  // handle selected board id and modal step
  const handleSelectBoardList = (id?: string | undefined) => {
    if(dataList.status === 'ورک اسپیس'){
      const selectedWorkSpace = workSpaces.filter(workspace => workspace._id === id )
      const newData = selectedWorkSpace[0]?.projects
      
      setDataList({ ...dataList,status:'پروژه',data : newData , selectedId :newData[0]._id });
    }
    if(dataList.status === 'پروژه'){
     id && dispatch(fetchBoards(id))
      
      console.log(projects);
      
      // setDataList({ ...dataList,status:'برد'});

    }
    
  };
  
  // handle add new task with dispatch redux toolkit
  const handleDispatchNewTask = (data: (string | undefined)[]) => {
    // data.push(boards.boardId);
    // const [name, description, boardId] = [...data];
    // const formData = {
    //   name,
    //   description,
    //   boardId,
    //   deadline: "2023-05-16T12:52:24.483+00:00",
    // };
    // dispatch(fetchCreateTask(formData));
    // setNewTaskModal(false);
  };
  useEffect(()=> { 
    if(dataList.status === 'ورک اسپیس'){
      setDataList({...dataList,data :workSpaces })
    }   
    if(dataList.status === 'پروژه'){
      console.log(projects[0].projectBoards);
      setDataList({...dataList,data :projects[0].projectBoards , status : 'برد' })
    }   
  },[workSpaces , isSuccess])
  // console.log(dataList.data);
  
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
    WraperClasses = `overflow-x-auto my-4 overflow-y-hidden flex ${commonStyle} `;
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
              : selectedWorkSpaceHeader
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
            {dataList.status === "تسک" ? (
              <AddNewTask
                handleAddNewTask={handleDispatchNewTask}
                handleNewTaskModal={handleNewTaskModal}
              />
            ) : (
              
              <SelectBoard
                data={dataList.data}
                selectedHandle={handleSelectBoardList}
                status={dataList.status}
                toggleModal={handleNewTaskModal}
              />
            )}
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default DashboardLayout;
