import Collapsible from "../../components/dashboard/dashboardListView/Collapsible";
import CollapseTable from "../../components/dashboard/dashboardListView/CollapseTable";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { fetchBoards } from "../../services/app/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ListView = () => {
  const { isError, message, isSuccess, isLoading, workSpaces } = useAppSelector(
    (state) => state.projects
  );
  const {projects} = useAppSelector((state) => state.boards);
  const selectedWorkSpaceId = useAppSelector(
    (state) => state.workSpaces.selectedWorkSpaceId
  );
  
  const dispatch = useAppDispatch();

  const colors = JSON.parse(localStorage.getItem("Colors") || "[]");
  const titleClass = "px-3 py-1 rounded text-base text-white";
  const chevronClass = "text-lg mr-10";
  const workspaceProjects = workSpaces.filter(
    (project) => project.workSpaceId === selectedWorkSpaceId
  );

  if (isLoading) {
    return (
      <AiOutlineLoading3Quarters
        size="2.8rem"
        color="208D8E"
        className="m-auto animate-spin"
      />
    );
  }
  if (isError) {
    return <div className="m-auto text-FB0606">{`${message}`}</div>;
  }

  if (!isSuccess) {
    return (
      <div className="m-auto">
        ورک اسپیسی را جهت نمایش اطلاعات انتخاب کنید 😃
      </div>
    );
  }

  if (workspaceProjects[0]?.projects.length === 0) {
    return <div className="m-auto">هیچ اطلاعاتی جهت نمایش وجود ندارد ☹️</div>;
  }

  const handleClick = (projectId: string) => {
    const projectIndex = projects.findIndex(
      (project) => project.projectId === projectId
    );
    if (projectIndex < 0) {
      dispatch(fetchBoards(projectId));
    }
  };
  return (
    <div className="pb-8 w-full">
      {workspaceProjects[0]?.projects.map(({ name, _id }) => (
        <div key={_id} onClick={() => handleClick(_id)}>
          <Collapsible
            title={name}
            titleClass="font-bold"
            chevronClass="text-xl mr-1"
            id={_id}
          >
            {projects
              .find((project) => project.projectId === _id)
              ?.projectBoards.map(({ name, tasks, _id }, index) => (
                <Collapsible
                  key={_id}
                  title={name}
                  numberTask={tasks.length}
                  titleClass={`${colors[index]} ${titleClass}`}
                  chevronClass={chevronClass}
                >
                  <CollapseTable tasks={tasks} color={colors[index]} />
                </Collapsible>
              ))}
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default ListView;
