import Header from "../components/dashboard/dashboardColumnView/Header";
import TaskCard from "../components/dashboard/dashboardColumnView/TaskCard";

const ColumnView = () => {
    return ( <div>

        <Header title={'Pending'} borderColor="F98F2E" number={"۰"} />
        <TaskCard />
        <TaskCard />
        <TaskCard />
    </div> );
}
 
export default ColumnView;