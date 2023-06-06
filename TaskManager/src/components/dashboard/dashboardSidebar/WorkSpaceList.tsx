import { SetStateAction, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SideMore from "../../modals/Small/SideMore";
import ProjectList from "./ProjectList";
import { createPortal } from "react-dom";


type WorkSpaceProps = {
  spaceList: {
    spaceName: string;
    projectName?: string[];
    spaceColor: string;
  }[];
};

const WorkSpaceList = ({ spaceList }: WorkSpaceProps) => {
  const [workspaceMore , setWorkspaceMore] = useState(null)
  const [morePosition , setMorePosition] = useState<SetStateAction<any>>({
    top : null,
    left : null
  })

  const handleItemClick = (e:any,item:any) => {
    if(workspaceMore === null){
    const top =`${e.clientY}px`
    const left =`${e.clientX}px`
    setMorePosition({...morePosition, top : top,left : left})
    setWorkspaceMore(item)
    }
    else{
      setWorkspaceMore(null)
    }
  }
 

  return (
    <>
    <div className="my-5  flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">

      {spaceList.map((space) => {
        return (
          <div className="collapse group/title" key={space.spaceName}>
            <input type="checkbox" className="p-0 m-0" />
            <div className=" collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
              <div className=" flex items-center">
                <span className={`block w-5 h-5 ml-2 rounded bg-${space.spaceColor}`} />
                {space.spaceName}

              </div>

              <div 
                className="absolute left-0 cursor-pointer hidden group-hover/title:block z-10" 
                onClick={(event)=> handleItemClick(event ,space.spaceName)}
              >
                <BsThreeDots />
              </div>
             
              
            </div>
            
            <ProjectList space={space}  />
          </div>
        );
      })}

      
    </div>
    {workspaceMore && 
      createPortal(
        <SideMore sideMoreState="ورک اسپیس" morePosition={morePosition}/>,
        document.body
      )
    }

    </>
  );
};

export default WorkSpaceList;
