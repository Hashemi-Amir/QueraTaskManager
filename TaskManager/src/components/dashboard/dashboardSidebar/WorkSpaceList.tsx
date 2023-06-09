import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SideMore from "../../modals/Small/SideMore";
import ProjectList from "./ProjectList";
type WorkSpaceProps = {
  workSpaces: {
    _id: string;
    name: string;
    user: string;
    members: [];
    projects: [];
  }[];
};
const colors = JSON.parse(localStorage.getItem("Colors") as string);

const WorkSpaceList = ({ workSpaces }: WorkSpaceProps) => {
  const [workspaceMore, setWorkspaceMore] = useState(false);
console.log('workspaceList');

  return (
    <div className="my-5 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
      {workSpaces.map(({ name, _id, projects }, index) => {
        return (
          <div className="collapse group/title" key={_id}>
            <input type="checkbox" className="p-0 m-0" />
            <div className="relative collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
              <div className="flex gap-2 group">
                <div className={`w-5 h-5 rounded ${colors[index]}`}></div>
                <div>{name}</div>
              </div>

              <div
                className="absolute left-0 cursor-pointer hidden group-hover/title:block z-10"
                onClick={() => setWorkspaceMore(true)}
              >
                <BsThreeDots />
              </div>
              {workspaceMore && <SideMore sideMoreState="ورک اسپیس" />}
            </div>
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
