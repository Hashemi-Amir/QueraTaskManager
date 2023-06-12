import Collapsible from "../../components/dashboard/dashboardListView/Collapsible";
import CollapseTable from "../../components/dashboard/dashboardListView/CollapseTable";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { fetchBoards } from "../../services/app/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setAddProject } from "../../services/features/projects/projectSlice";

const ListView = () => {
  const { isError, message, isSuccess, isLoading, projects } = useAppSelector(
    (state) => state.projects
  );
  const boards = useAppSelector((state) => state.boards.projects);
  const selectedWorkSpaceId = useAppSelector(
    (state) => state.workSpaces.selectedWorkSpaceId
  );
  const dispatch = useAppDispatch();

  const colors = JSON.parse(localStorage.getItem("Colors") || "[]");
  const titleClass = "px-3 py-1 rounded text-base text-white";
  const chevronClass = "text-lg mr-10";
  const workspaceProjects = projects.filter(
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
    const projectIndex = boards.findIndex(
      (project) => project.projectId === projectId
    );
    if (projectIndex < 0) {
      dispatch(fetchBoards(projectId));
    }
  };
  const handleonclicktest = () => {
    dispatch(
      setAddProject({
        _id: "648375536f2b80f6ae0f60b5",
        name: "Doing",
        position: 2,
        project: "648372756f2b80f6ae0f603d",
        tasks: [
          {
            _id: "648376006f2b80f6ae0f60cd",
            name: "درگاه پرداخت",
            description:
              "ساخت درگاه پرداحت دیجی‌پی و قرارداد با بانکهای مربوطه",
            label: [],
            board: "648375536f2b80f6ae0f60b5",
            taskAssigns: [],
            comments: [],
            position: 1,
          },
          {
            _id: "6485dd8e6141d43b3fa5ba2a",
            name: "حسابداری",
            description: "مرتب کردن فاکتورها و محاسبه بدهی‌ها",
            label: [],
            board: "648375536f2b80f6ae0f60b5",
            taskAssigns: [],
            comments: [],
            position: 2,
          },
        ],
      })
    );

    //
  };
  return (
    <div className="pb-8 w-full">
      <button onClick={handleonclicktest}>test</button>
      {workspaceProjects[0].projects.map(({ name, _id }) => (
        <div key={_id} onClick={() => handleClick(_id)}>
          <Collapsible
            title={name}
            titleClass="font-bold"
            chevronClass="text-xl mr-1"
            id={_id}
          >
            {boards
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
      {isError && <div className="m-auto text-FB0606">{`${message}`}</div>}
    </div>
  );
};

export default ListView;
