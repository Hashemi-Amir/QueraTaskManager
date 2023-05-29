// import { useLocation, Outlet } from "react-router-dom";
// import Header from "../components/dashboardHeader/Header";
// import SideBar from "../components/dashboardSidebar/SideBar";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout = ({ children }: DashboardLayoutProps) => {
//   const Location = useLocation();
//   let WraperClasses = "";

//   // Dynamically styling different view wrapers
//   if (Location.pathname === "/columnview")
//     WraperClasses =
//       "overflow-x-auto max-w-[85vw] h-full overflow-y-hidden flex gap-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white";
//   else if (Location.pathname === "/listview")
//     WraperClasses =
//       "max-w-[85vw] h-full overflow-y-auto flex-col gap-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white";

//   return (
//     <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC">
//       <SideBar />
//       <div className="w-4/5 h-[81vh] pr-4 pl-10 ">
//         {/* Header */}
//         <Header projectName="پروژه اول" />
//         {/* Without Classes for calander view */}
//         <div className={` ${WraperClasses}`}>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/dashboardHeader/Header";
import SideBar from "../components/dashboardSidebar/SideBar";

const DashboardLayout = () => {
  const Location = useLocation();
  let WraperClasses = "";

  // Dynamically styling different view wrapers
  if (Location.pathname === "/columnview")
    WraperClasses =
      "overflow-x-auto max-w-[85vw] h-full overflow-y-hidden flex gap-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white";
  else if (Location.pathname === "/listview")
    WraperClasses =
      "max-w-[85vw] h-full overflow-y-auto flex-col gap-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white";

  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC">
      <SideBar />
      <div className="w-4/5 h-[80vh] pr-4 pl-10 ">
        {/* Header */}
        <Header projectName="پروژه اول" />
        {/* Without Classes for calander view */}
        <div className={` ${WraperClasses}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
