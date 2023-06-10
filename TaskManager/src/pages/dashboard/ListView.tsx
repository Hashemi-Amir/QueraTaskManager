import Collapsible from "../../components/dashboard/dashboardListView/Collapsible";
import CollapseTable from "../../components/dashboard/dashboardListView/CollapseTable";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { fetchListBoards } from "../../services/app/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ListView = () => {
  const { isError, message, isSuccess, isLoading, projects } = useAppSelector(
    (state) => state.projects
  );
  const { listBoards } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  const colors = JSON.parse(localStorage.getItem("Colors") as string);
  const titleClass = "px-3 py-1 rounded text-base text-white";
  const chevronClass = "text-lg mr-10";

  return (
    <>
      {!isSuccess && !isError && !isLoading ? (
        <div className="m-auto">
          ورک اسپیسی را جهت نمایش اطلاعات انتخاب کنید 😃
        </div>
      ) : isLoading ? (
        <AiOutlineLoading3Quarters
          size="2.8rem"
          color="208D8E"
          className="m-auto animate-spin"
        />
      ) : isSuccess && projects.length === 0 ? (
        <div className="m-auto">هیچ اطلاعاتی جهت نمایش وجود ندارد ☹️</div>
      ) : (
        <div className="pb-8 w-full">
          {projects.map(({ name, _id }) => (
            <div
              key={_id}
              onClick={() => {
                dispatch(fetchListBoards(_id));
              }}
            >
              <Collapsible
                title={name}
                titleClass="font-bold"
                chevronClass={"text-xl mr-1"}
                id={_id}
              >
                {listBoards
                  .find((item) => item.projectId === _id)
                  ?.boards.map(({ name, tasks, _id }, index) => (
                    <Collapsible
                      title={name}
                      numberTask={tasks.length}
                      key={_id}
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
      )}
      {isError && <div className="m-auto text-FB0606">{`${message}`}</div>}
    </>
  );
};

export default ListView;
