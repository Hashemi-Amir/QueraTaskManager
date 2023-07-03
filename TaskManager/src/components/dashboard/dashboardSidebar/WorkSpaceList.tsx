import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SideMore from "../../modals/Small/SideMore";
import ProjectList, { MorePosition } from "./ProjectList";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import {
  deleteWorkSpace,
  resetPostWorkspace,
  setSelectedWorkSpaceHeader,
  setSelectedWorkSpaceId,
  updateWorkSpace,
} from "../../../services/features/workSpaceList/workSpacesSlice";
import {
  fetchProjects,
  resetProject,
  toggleSmallModal,
} from "../../../services/app/store";
import {
  resetBoards,
  setSelectedProjectId,
} from "../../../services/features/boards/boardSlice";
import { setSelectedProject } from "../../../services/features/projects/projectSlice";

// import { useLocation } from "react-router-dom";
import { workSpacesType } from "./SideBar";
import Modal from "../../../layout/Modal";
import Button from "../../ui/Button";

export type WorkSpaceProps = {
  workSpaces: workSpacesType;
};

const WorkSpaceList = ({ workSpaces }: WorkSpaceProps) => {
  const dispatch = useAppDispatch();
  const { workSpaces: stateProject } = useAppSelector(
    (state) => state.projects
  );
  const { selectedWorkSpaceId } = useAppSelector((state) => state.workSpaces);
  const { small } = useAppSelector((state) => state.modals);
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
  // delete workspace and called dispatch redux toolkit
  const handleDeleteWorkSpace = () => {
    selectedWorkSpaceId && dispatch(deleteWorkSpace(selectedWorkSpaceId));
    dispatch(setSelectedWorkSpaceId(""));
    dispatch(setSelectedWorkSpaceHeader(""));
    dispatch(resetProject());
    dispatch(setSelectedProjectId(""));
    dispatch(setSelectedProject(""));
    dispatch(resetBoards());
  };
  const colors = JSON.parse(localStorage.getItem("Colors") as string);
  // get username and send to updateWorkSpace
  const user = useAppSelector((state) => state.auth.user);

  const handleEdit = (id: string) => {
    const val = document.querySelector<HTMLInputElement>("#edit")?.value;
    const data = [val, id, user?.username];
    if (val?.trim()) {
      dispatch(setSelectedWorkSpaceHeader(val.trim()));
      dispatch(updateWorkSpace(data));
      dispatch(resetPostWorkspace());
      setEditMood("");
    }
  };
  return (
    <div className="my-5 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full dark:scrollbar-track-[#0f111a] dark:scrollbar-thumb-[#3f4148] ">
      {workSpaces?.map(({ name, _id, projects }, index) => {
        return (
          <div key={_id}>
            {editMood === _id ? (
              <div className="flex px-1 w-full">
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
                  className="!w-1/4 font-medium rounded-none bg-[#f92e8f] hover:!bg-[#f92e8f] focus:!ring-0 dark:bg-[#f92e8f]"
                />
                <Button
                  value="ویرایش"
                  onClick={() => handleEdit(_id)}
                  className="!w-1/4 font-medium  rounded-tr-none rounded-br-none focus:!ring-0"
                />
              </div>
            ) : (
              <div
                className="collapse group/title"
                key={_id}
                onClick={() => {
                  const workSpaceIndex = stateProject.findIndex((projects) => {
                    return projects.workSpaceId === _id;
                  });
                  if (workSpaceIndex < 0) dispatch(fetchProjects(_id));

                  dispatch(setSelectedWorkSpaceId(_id));
                  dispatch(setSelectedWorkSpaceHeader(name));
                }}
              >
                <input type="checkbox" className="p-0 m-0" />
                <div className="relative collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
                  <div className="flex gap-2 group">
                    <div className={`w-5 h-5 rounded ${colors?.[index]}`}></div>
                    <div>{name}</div>
                  </div>

                  <div
                    className="absolute left-2 cursor-pointer hidden group-hover/title:block z-10"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleItemClick(event);
                      dispatch(setSelectedWorkSpaceId(_id));
                      dispatch(toggleSmallModal(_id));
                    }}
                  >
                    <BsThreeDots />
                  </div>
                </div>
                <div className="collapse-content">
                  <ProjectList projects={projects} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {small === selectedWorkSpaceId &&
        small != "" &&
        createPortal(
          <Modal className="!bg-transparent">
            <SideMore
              sideMoreState="ورک اسپیس"
              morePosition={morePosition}
              handleDelete={handleDeleteWorkSpace}
              id={selectedWorkSpaceId}
              handleEditMood={handleEditMood}
            />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default WorkSpaceList;
