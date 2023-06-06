import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SideMore from "../../modals/Small/SideMore";
import ProjectList from "./ProjectList";


type WorkSpaceProps = {
  spaceList: {
    spaceName: string;
    projectName?: string[];
    spaceColor: string;
  }[];
};

const WorkSpaceList = ({ spaceList }: WorkSpaceProps) => {
  const [workspaceMore , setWorkspaceMore] = useState(null)

  const handleItemClick = (item:any) => {
    setWorkspaceMore(item)
  }
  const closeWorkSpace = () => {
    setWorkspaceMore(null)
  }
  // const handleWorkSpaceMore = () => {
  //   console.log('wop');
    
  //   setWorkspaceMore(!workspaceMore)
  // }
  return (
    <div className="my-5 relative flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
      {spaceList.map((space) => {
        return (
          <div className="collapse group/title" key={space.spaceName}>
            <input type="checkbox" className="p-0 m-0" />
            <div className="relative collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
              <div className="flex items-center">
                <span className={`block w-5 h-5 ml-2 rounded ${space.spaceColor}`} />
                {space.spaceName}
              </div>

              <div className="absolute left-0 cursor-pointer hidden group-hover/title:block z-10" onClick={()=> handleItemClick(space.spaceName)}><BsThreeDots /></div>
             
              
            </div>
            <ProjectList space={space} />
          </div>
        );
      })}
       {workspaceMore && <SideMore sideMoreState="ورک اسپیس"/>}

    </div>
  );
};

export default WorkSpaceList;
