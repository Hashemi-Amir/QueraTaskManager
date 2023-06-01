// import { useLocation, Outlet } from "react-router-dom";
// import Header from "../components/dashboard/dashboardHeader/Header";
// import SideBar from "../components/dashboard/dashboardSidebar/SideBar";

// const DashboardLayout = () => {
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
//       <div className="w-4/5 h-[80vh] pr-4 pl-10 ">
//         {/* Header */}
//         <Header projectName="پروژه اول" />
//         {/* Without Classes for calander view */}
//         <div className={` ${WraperClasses}`}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/dashboard/dashboardHeader/Header";
import SideBar from "../components/dashboard/dashboardSidebar/SideBar";

const DashboardLayout = () => {
  const Location = useLocation();
  let WraperClasses = "";

  const commonStyle =
    "max-w-[85vw] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-white gap-5";

  // Dynamically styling different view wrapers
  if (Location.pathname === "/columnview")
    WraperClasses = `overflow-x-auto my-4 overflow-y-hidden flex ${commonStyle} `;
  else if (Location.pathname === "/listview")
    WraperClasses = `mt-4 overflow-y-auto flex-col ${commonStyle}`;
  else if (Location.pathname === "/calendarview") WraperClasses = "mt-2";

  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC">
      <SideBar />
      <div className="w-4/5 pr-4 pl-10 min-h-screen">
        {/* Header */}
        <Header projectName="پروژه اول" />
        {/* Without Classes for calander view */}
        <div className={` ${WraperClasses} h-[calc(100%-12rem)]`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
