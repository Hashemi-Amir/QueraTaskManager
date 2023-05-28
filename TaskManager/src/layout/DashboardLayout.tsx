import Header from "../components/dashboardHeader/Header";
import SideBar from "../components/dashboardSidebar/SideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-row w-full max-h-screen overflow-hidden bg-FAFBFC">
      <SideBar />
      <div className="w-4/5 h-[81vh] pr-4 pl-10 ">
        {/* Header */}
        <Header projectName="پروژه اول" />
        {/* pages */}
        <div className="overflow-x-auto max-w-[85vw] h-full overflow-y-hidden flex gap-5 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
