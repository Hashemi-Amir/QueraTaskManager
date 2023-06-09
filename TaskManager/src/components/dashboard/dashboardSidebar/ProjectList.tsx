import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch } from "../../../services/app/hook";
import { fetchBoards } from "../../../services/features/boards/boardSlice";

type Projects = {
  projects: [];
};

function ProjectList({ projects }: Projects) {
  const dispatch = useAppDispatch();

  return (
    <>
      {projects.map(({ _id, name }) => (
        <div
          className="pb-3 font-medium flex justify-between items-center cursor-pointer group/content"
          key={_id}
          onClick={() => {
            dispatch(fetchBoards(_id));
          }}
        >
          {name}
          <span className="cursor-pointer hidden group-hover/content:block z-10">
            <BsThreeDots />
          </span>
        </div>
      ))}
    </>
  );
}

export default ProjectList;
