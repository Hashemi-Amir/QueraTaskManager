import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch } from "../../../services/app/hook";
import { fetchBoards } from "../../../services/features/boards/boardSlice";
import { createPortal } from "react-dom";
import SideMore from "../../modals/Small/SideMore";

type Projects = {
  projects: [];
};

function ProjectList({ projects }: Projects) {
  const dispatch = useAppDispatch();

  const [projectMore, setprojectMore] = useState("");
  const [morePosition, setMorePosition] = useState<object>({
    top: 0,
    left: 0,
  });
  const handleItemClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: string
  ) => {
    if (projectMore === null) {
      const top = `${e.clientY}px`;
      const left = `${e.clientX}px`;
      setMorePosition({ ...morePosition, top: top, left: left });
      setprojectMore(item);
    } else {
      setprojectMore("");
    }
  };
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
          <span
            className="cursor-pointer hidden group-hover/content:block z-10"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              handleItemClick(e, name)
            }
          >
            <BsThreeDots />
          </span>
        </div>
      ))}

      {projectMore &&
        createPortal(
          <SideMore sideMoreState="تسک" morePosition={morePosition} />,
          document.body
        )}
    </>
  );
}

export default ProjectList;
