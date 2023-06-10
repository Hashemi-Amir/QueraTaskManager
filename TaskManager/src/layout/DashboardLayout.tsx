import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/dashboard/dashboardHeader/Header";
import SideBar from "../components/dashboard/dashboardSidebar/SideBar";
import Button from "../components/ui/Button";
import { CgAddR } from "react-icons/cg";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import AddNewTask from "../components/modals/Large/AddNewTask";

const DashboardLayout = () => {
  const [newTaskModal, setNewTaskModal] = useState(false);
  const Location = useLocation();
  const handleNewTaskModal = () => setNewTaskModal(!newTaskModal);

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
  else if (Location.pathname === "/listview")
    WraperClasses = `overflow-y-auto mt-4 flex ${commonStyle}`;
  else if (Location.pathname === "/calendarview")
    WraperClasses = "overflow-hidden mt-2 h-[calc(100%-14rem)]";

  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC">
      <SideBar />
      <div className="w-4/5 pr-4 pl-10 min-h-screen">
        {/* Header */}
        <Header projectName="پروژه اول" />

        {/* Without Classes for calander view */}
        <div className={` ${WraperClasses} `}>
          <Outlet />
        </div>
      </div>
      <div className="fixed left-5 bottom-3 cur z-50">
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

      {newTaskModal &&
        createPortal(
          <Modal>
            <AddNewTask handleNewTaskModal={handleNewTaskModal} />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default DashboardLayout;
