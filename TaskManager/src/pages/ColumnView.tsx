import Board from "../components/dashboard/dashboardColumnView/Board";
import DashboardLayout from "../layout/DashboardLayout";

const ColumnView = () => {
  return (
    <DashboardLayout>
      <Board title={"Pending"} borderColor={"border-t-F98F2E"} number={"۰"} />
      <Board title={"Done"} borderColor={"border-t-208D8E"} number={"۲"} />
      <Board title={"Open"} borderColor={"border-t-red-500"} number={"۰"} />
    </DashboardLayout>
  );
};

export default ColumnView;
