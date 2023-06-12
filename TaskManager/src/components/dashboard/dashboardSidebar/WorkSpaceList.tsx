import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SideMore from "../../modals/Small/SideMore";
import ProjectList from "./ProjectList";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import {
  deleteWorkSpace,
  fetchProjects,
  setSelectedWorkSpaceHeader,
  setSelectedWorkSpaceId,
} from "../../../services/app/store";
import { useLocation } from "react-router-dom";

type WorkSpaceProps = {
  workSpaces: {
    _id: string;
    name: string;
    user: string;
    members: [];
    projects: [];
  }[];
};

const WorkSpaceList = ({ workSpaces }: WorkSpaceProps) => {
  const dispatch = useAppDispatch();
  const Location = useLocation();
  const { workSpaces: stateProject } = useAppSelector((state) => state.projects);
  const [workspaceMore, setWorkspaceMore] = useState({
    modal: "",
    id: "",
  });
  const [morePosition, setMorePosition] = useState<object>({
    top: 0,
    left: 0,
  });

  // modal toggle handle
  const handleItemClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: string,
    id: string
  ) => {
    if (workspaceMore.modal === "") {
      const top = `${e.clientY}px`;
      const left = `${e.clientX}px`;
      setMorePosition({ ...morePosition, top: top, left: left });
      setWorkspaceMore({ ...workspaceMore, modal: item, id: id });
    } else {
      setWorkspaceMore({ ...workspaceMore, modal: "", id: "" });
    }
  };

  // delete workspace and called dispatch redux toolkit
  const handleDeleteWorkSpace = () => {
    dispatch(deleteWorkSpace(workspaceMore.id));
    setWorkspaceMore({ ...workspaceMore, modal: "", id: "" });
  };
  const colors = JSON.parse(localStorage.getItem("Colors") as string);

  return (
    <div className="my-5 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
      {workSpaces?.map(({ name, _id, projects }, index) => {
        return (
          <div
            className="collapse group/title"
            key={_id}
            onClick={(event) => {
              if (
                Location.pathname === "/listview" ||
                Location.pathname === "/"
              ) {
                const workSpaceIndex = stateProject.findIndex((projects) => {
                  return projects.workSpaceId === _id;
                });
                if (workSpaceIndex < 0) dispatch(fetchProjects(_id));
              } else {
                event.stopPropagation();
              }
              dispatch(setSelectedWorkSpaceId(_id));
              dispatch(setSelectedWorkSpaceHeader(name))
            }}
          >
            <input type="checkbox" className="p-0 m-0" />
            <div className="relative collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
              <div className="flex gap-2 group">
                <div className={`w-5 h-5 rounded ${colors?.[index]}`}></div>
                <div>{name}</div>
              </div>

              <div
                className="absolute left-2 p-3 cursor-pointer hidden group-hover/title:block z-10"
                onClick={(event) => {
                  event.stopPropagation();
                  handleItemClick(event, name, _id);
                }}
              >
                <BsThreeDots />
              </div>
            </div>

            {workspaceMore.modal &&
              createPortal(
                <SideMore
                  sideMoreState="ورک اسپیس"
                  morePosition={morePosition}
                  handleDeleteWorkSpace={handleDeleteWorkSpace}
                  id={workspaceMore.id}
                  handleItemClick={handleItemClick}
                />,
                document.body
              )}

            <div className="collapse-content">
              <ProjectList projects={projects} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkSpaceList;
