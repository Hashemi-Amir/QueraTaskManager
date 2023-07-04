import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { deleteProject, toggleSmallModal } from "../../../services/app/store";

import {
  resetBoards,
  setSelectedProjectId,
} from "../../../services/features/boards/boardSlice";
import {
  editProjectName,
  resetPostProject,
  setSelectedProject,
  setSelectedProjectSidebar,
} from "../../../services/features/projects/projectSlice";
import { fetchBoards } from "../../../services/app/store";
import { createPortal } from "react-dom";
import SideMore from "../../modals/Small/SideMore";
import Modal from "../../../layout/Modal";
import Button from "../../ui/Button";

export type Projects = {
  projects: { _id: string; name: string; boards: [] }[];
};

export type MorePosition = {
  top: number | string | undefined;
  left: number | string | undefined;
  clientX?: number | undefined;
  clientY?: number | undefined;
};
function ProjectList({ projects }: Projects) {
  const dispatch = useAppDispatch();
  const { small } = useAppSelector((state) => state.modals);
  const [projectId, setProjectId] = useState("");
  const { projects: projectState } = useAppSelector((state) => state.boards);
  const { selectedProjectSidebar } = useAppSelector((state) => state.projects);
  const [morePosition, setMorePosition] = useState<MorePosition>({
    top: 0,
    left: 0,
  });
  const [editMood, setEditMood] = useState("");
  const handleEditMood = (toggle: string | undefined) => {
    toggle && setEditMood(toggle);
  };

  const handleItemClick = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // Get the client's screen dimensions
    const { clientX, clientY } = e || { clientX: 0, clientY: 0 };

    // Calculate the new top position based on the client's Y-coordinate and window height
    const windowHeight = window.innerHeight;
    const top = `${Math.min(clientY, windowHeight - 220)}px`;

    // Calculate the new left position based on the client's X-coordinate and window width
    const windowWidth = window.innerWidth;
    const left = `${Math.min(clientX, windowWidth - 220)}px`;

    // Set the new position in the state
    setMorePosition({ ...morePosition, top, left, clientX, clientY });
  };

  useEffect(() => {
    const handleWindowResize = () => {
      const { clientX, clientY } = morePosition;

      // Calculate the new top position based on the updated window height
      const windowHeight = window.innerHeight;
      const top = clientY && `${Math.min(clientY, windowHeight - 220)}px`;

      // Calculate the new left position based on the updated window width
      const windowWidth = window.innerWidth;
      const left = clientX && `${Math.min(clientX, windowWidth - 220)}px`;

      setMorePosition({ ...morePosition, top, left });
    };

    // Add the resize event listener
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [morePosition]);

  // handle delete project
  const handleDeleteProject = () => {
    projectId && dispatch(deleteProject(projectId));
    handleItemClick();
    dispatch(setSelectedProjectId(""));
    dispatch(setSelectedProject(""));
    dispatch(resetBoards());    
  };

  const handleEdit = (id: string) => {
    const val = document.querySelector<HTMLInputElement>("#edit")?.value;
    if (val?.trim()) {
      const data = [id, val];
      dispatch(setSelectedProject(val.trim()));
      dispatch(editProjectName(data));
      dispatch(resetPostProject());
      setEditMood("");
    }
  };
  return (
    <>
      {projects.map(({ _id, name }) => (
        <div key={_id}>
          {editMood === _id ? (
            <div className="flex px-1 py-3 w-full">
              <input
                type="text"
                id="edit"
                placeholder="نام جدید"
                autoComplete="off"
                className="w-3/4 font-medium  border border-AAAAAA h-10 rounded-tr-md rounded-br-md px-3 py-2 focus:outline-none placeholder:text-sm dark:bg-[#1E2124] dark:text-[#f7f7f9]"
              />
              <Button
                value="لغو"
                onClick={() => setEditMood("")}
                className="!w-1/4 text-xs rounded-none bg-[#f92e8f] placeholder:text-xs hover:!bg-[#f92e8f] focus:!ring-0 dark:bg-[#f92e8f]"
              />
              <Button
                value="ویرایش"
                onClick={() => handleEdit(_id)}
                className="!w-1/4 text-xs rounded-tr-none rounded-br-none focus:!ring-0"
              />
            </div>
          ) : (
            <div
              className={`pb-3 font-medium flex justify-between items-center cursor-pointer group/content ${
                selectedProjectSidebar === name
                  ? "text-[#118c80] transition-all dark:text-[#F1B127]"
                  : ""
              }`}
              key={_id}
              onClick={() => {
                const projectIndex = projectState.findIndex((project) => {
                  return project.projectId === _id;
                });
                if (projectIndex < 0) dispatch(fetchBoards(_id));
                dispatch(setSelectedProjectSidebar(name));
                dispatch(setSelectedProjectId(_id));
                dispatch(setSelectedProject(name));
              }}
            >
              {name}
              <span
                className=" left-2 cursor-pointer hidden group-hover/content:block z-10"
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  setProjectId(_id);
                  dispatch(toggleSmallModal(_id));
                  handleItemClick(e);
                }}
              >
                <BsThreeDots />
              </span>
            </div>
          )}
        </div>
      ))}

      {small === projectId &&
        small != "" &&
        createPortal(
          <Modal className="!bg-transparent">
            <SideMore
              sideMoreState="تسک"
              morePosition={morePosition}
              handleDelete={handleDeleteProject}
              id={projectId}
              handleEditMood={handleEditMood}
            />
          </Modal>,
          document.body
        )}
    </>
  );
}

export default ProjectList;
