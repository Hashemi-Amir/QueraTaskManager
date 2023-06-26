import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { deleteProject } from "../../../services/app/store";

import { setSelectedProjectId } from "../../../services/features/boards/boardSlice";
import { setSelectedProject } from "../../../services/features/projects/projectSlice";
import { fetchBoards } from "../../../services/app/store";
import { createPortal } from "react-dom";
import SideMore from "../../modals/Small/SideMore";

type Projects = {
  projects: [];
};

function ProjectList({ projects }: Projects) {
  const dispatch = useAppDispatch();
  const { projects: projectState } = useAppSelector((state) => state.boards);

  const [projectMore, setprojectMore] = useState<string | undefined>("");
  const [morePosition, setMorePosition] = useState<object>({
    top: 0,
    left: 0,
  });

  // open or close modal toggle
  const handleItemClick = (
    e?: React.MouseEvent<HTMLElement, MouseEvent>,
    id?: string | undefined
  ) => {
    if (projectMore === "") {
      const top = `${e?.clientY}px`;
      const left = `${e?.clientX}px`;
      setMorePosition({ ...morePosition, top: top, left: left });
      setprojectMore(id);
    } else {
      setprojectMore("");
    }
  };

  // handle delete project
  const handleDeleteProject = () => {
    projectMore && dispatch(deleteProject(projectMore));
    handleItemClick();
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
            className=" left-2  cursor-pointer hidden group-hover/content:block z-10"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              handleItemClick(e, _id);
            }}
          >
            <BsThreeDots />
          </span>
        </div>
      ))}

      {projectMore &&
        createPortal(
          <SideMore
            sideMoreState="تسک"
            morePosition={morePosition}
            handleDelete={handleDeleteProject}
            id={projectMore}
            handleItemClick={handleItemClick}
          />,
          document.body
        )}
    </>
  );
}

export default ProjectList;
