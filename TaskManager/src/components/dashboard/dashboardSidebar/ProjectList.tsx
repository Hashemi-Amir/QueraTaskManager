import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import {
  fetchBoards,
  setSelectedProjectId,
} from "../../../services/features/boards/boardSlice";
import { setSelectedProject } from "../../../services/features/projects/projectSlice";
import { createPortal } from "react-dom";
import SideMore from "../../modals/Small/SideMore";
import { useLocation } from "react-router-dom";

type Projects = {
  projects: [];
};

function ProjectList({ projects }: Projects) {
  const dispatch = useAppDispatch();
  const Location = useLocation();
  const { projects: projectState } = useAppSelector((state) => state.boards);

  const [projectMore, setProjectMore] = useState("");
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
      setProjectMore(item);
    } else {
      setProjectMore("");
    }
  };
  return (
    <>
      {projects.map(({ _id, name }) => (
        <div
          className="pb-3 font-medium flex justify-between items-center cursor-pointer group/content"
          key={_id}
          onClick={() => {
            const projectIndex = projectState.findIndex((project) => {
              return project.projectId === _id;
            });
            if (projectIndex < 0) dispatch(fetchBoards(_id));
            dispatch(setSelectedProjectId(_id));
            dispatch(setSelectedProject(name));
          }}
        >
          {name}
          <span
            className=" left-2 p-3 cursor-pointer hidden group-hover/content:block z-10"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              handleItemClick(e, name);
              e.stopPropagation();
            }}
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
