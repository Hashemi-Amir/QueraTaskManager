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
import { toast } from "react-toastify";
import { getUser as getu, reset } from "../services/app/store";

const DashboardLayout = () => {
  //! For experiment !//
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    isError && toast.error((message as string) + "❗");
    isLoading && toast(" fetching workspaces⏳", { autoClose: 1000 });
    if (isSuccess) {
      toast("we just get it 🎉", { autoClose: 1000 });
    }
    dispatch(reset());
  }, [isSuccess, isError, message, isLoading, dispatch]);

  const getUser = () => {
    dispatch(getu());
  };
  //! For experiment !//

  // ************************************************ //

  const [newTaskModal, setNewTaskModal] = useState(false);

  const handleNewTaskModal = () => setNewTaskModal(!newTaskModal);
  const Location = useLocation();
  let WraperClasses = "";

  const commonStyle =
    "max-w-[85vw] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white gap-5 h-[calc(100%-12rem)]";

  // Dynamically styling different view wrapers
  if (Location.pathname === "/columnview")
    WraperClasses = `overflow-x-auto my-4 overflow-y-hidden flex ${commonStyle} `;
  else if (Location.pathname === "/listview")
    WraperClasses = `mt-4 overflow-y-auto flex-col ${commonStyle}`;
  else if (Location.pathname === "/calendarview")
    WraperClasses = "overflow-hidden mt-2 h-[calc(100%-14rem)]";

  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC">
      <SideBar />
      <div className="w-4/5 pr-4 pl-10 min-h-screen">
        {/* Header */}
        <Header projectName="پروژه اول" />
        //! For experiment !//
        <button
          className="border bg-slate-300 py-2 px-3 rounded-md "
          onClick={getUser}
        >
          get user workspace
        </button>
        //! For experiment !//
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
