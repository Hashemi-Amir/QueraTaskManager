import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SideMore from "../../modals/Small/SideMore";

type WorkSpaceProps = {
  spaceList: {
    spaceName: string;
    projectName?: string[];
    spaceColor: string;
  }[];
};

const WorkSpaceList = ({ spaceList }: WorkSpaceProps) => {
  const [workspaceMore, setWorkspaceMore] = useState(false);
  return (
    <div className="my-5 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
      {spaceList.map((space) => {
        return (
          <div className="collapse group/title" key={space.spaceName}>
            <input type="checkbox" className="p-0 m-0" />
            <div className="relative collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
              <div className="flex gap-2 group">
                <div className={`w-5 h-5 rounded bg-${space.spaceColor}`}></div>
                <div>{space.spaceName}</div>
              </div>

              <div
                className="absolute left-0 cursor-pointer hidden group-hover/title:block z-10"
                onClick={() => setWorkspaceMore(true)}
              >
                <BsThreeDots />
              </div>
              {workspaceMore && <SideMore sideMoreState="ورک اسپیس" />}
            </div>
            {space.projectName && (
              <div className="collapse-content ">
                {space.projectName.map((project) => (
                  <div
                    className="pb-3 font-medium flex justify-between items-center group/content"
                    key={project}
                  >
                    {project}
                    <span className="cursor-pointer hidden group-hover/content:block z-10">
                      <BsThreeDots />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WorkSpaceList;
