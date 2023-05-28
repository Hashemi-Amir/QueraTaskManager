import Header from "../components/dashboardHeader/Header";
import SideBar from "../components/dashboardSidebar/SideBar";
import Calendar from "../components/dashboardCalendar/Calendar";
import ListView from "../components/ui/ListView";

const Dashboard = () => {
  return (
    <div className="flex w-full max-h-screen overflow-hidden bg-FAFBFC">
      <SideBar />
      <div className="w-full pr-4 pl-10">
        <Header projectName="پروژه اول" />
        {/* <div className="h-screen overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
          <ListView />
        </div> */}
        <div className="w-full h-screen overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
