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
          <div className="collapse" key={space.spaceName}>
            <input type="checkbox" className="p-0 m-0" />
            <div className="relative collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
              <div className="flex items-center">
                <span className={`block w-5 h-5 ml-2 rounded ${space.spaceColor}`} />
                {space.spaceName}
              </div>

              <span className="absolute z-50 left-0 block cursor-pointer" onClick={()=> handleItemClick(space.spaceName)}><BsThreeDots /></span>
             
              
            </div>
           

            {space.projectName && (
              <div className="collapse-content  ">
                {space.projectName.map((project) => (
                  <p className="pb-3  font-medium flex justify-between items-center" key={project}>
                    {project}
                    <span className="cursor-pointer" ><BsThreeDots /></span>
                  </p>
                ))}
              </div>
            )}
            

          </div>
        );
      })}
       {workspaceMore && <SideMore sideMoreState="ورک اسپیس"/>}

    </div>
  );
};

export default WorkSpaceList;
