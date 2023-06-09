import Collapsible from "../../components/dashboard/dashboardListView/Collapsible";
import CollapseTable from "../../components/dashboard/dashboardListView/CollapseTable";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { fetchProjects } from "../../services/features/projects/projectSlice";
import { useEffect } from "react";
import { fetchBoards } from "../../services/features/boards/boardSlice";

const ListView = () => {
  const { isSuccess, projects } = useAppSelector((state) => state.projects);
  const { isError, isLoading, boards } = useAppSelector(
    (state) => state.boards
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProjects("648205d2101dafd92ddc8c2a"));
  }, [dispatch]);
  const titleClass = "px-3 py-1 rounded text-base text-white";
  const chevronClass = "text-lg mr-10";

  return (
    <div className="pb-8">
      {projects.map(({ name, _id }) => (
        <div
          key={_id}
          onClick={() => {
            dispatch(fetchBoards(_id));
            console.log(_id);
          }}
        >
          <Collapsible
            title={name}
            titleClass="font-bold"
            chevronClass={"text-xl mr-1"}
            id={_id}
          >
            {boards.map(({ name, tasks, _id }) => {
              return (
                <Collapsible
                  title={name}
                  numberTask={tasks.length}
                  key={_id}
                  titleClass={`bg-F92E8F ${titleClass}`}
                  chevronClass={chevronClass}
                >
                  {/* <CollapseTable tasks={project.pending} /> */}
                  <div>test</div>
                </Collapsible>
              );
            })}
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default ListView;
