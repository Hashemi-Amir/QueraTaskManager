import Header from "../components/dashboardHeader/Header";
import SideBar from "../components/dashboardSidebar/SideBar";

const Dashboard = () => {
  return (
    <div className="flex max-w-[1440px] ">
      <SideBar />
      <div className="flex-1 px-4">
        <Header projectName="پروژه اول" />
      </div>
    </div>
  );
};

export default Dashboard;
