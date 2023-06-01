import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/dashboard/dashboardHeader/Header";
import SideBar from "../components/dashboard/dashboardSidebar/SideBar";
import Button from "../components/ui/Button";
import { CgAddR } from "react-icons/cg";

const DashboardLayout = () => {
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
        {/* Without Classes for calander view */}
        <div className={` ${WraperClasses} `}>
          <Outlet />
        </div>
      </div>
      <div className="fixed left-5 bottom-3 cur z-50">
        <Button className="text-l px-2 py rounded-lg" value={"تسک جدید"}>
          <CgAddR
            size={20}
            color="white"
            className="ml-2 rounded-md mb-[1px]"
          />
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayout;
