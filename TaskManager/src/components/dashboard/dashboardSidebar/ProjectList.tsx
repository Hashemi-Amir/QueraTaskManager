import { SetStateAction, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SideMore from "../../modals/Small/SideMore";
import { createPortal } from "react-dom";

type Space = {
  space: {
    spaceName: string;
    projectName?: string[] | undefined;
    spaceColor: string;
  };
};

function ProjectList({ space }: Space) {

  const [projectMore , setprojectMore] = useState(null)
  const [morePosition , setMorePosition] = useState<SetStateAction<any>>({
    top : null,
    left : null
  })

  const handleItemClick = (e:any,item:any) => {
    if(projectMore === null){
    const top =`${e.clientY}px`
    const left =`${e.clientX}px`
    setMorePosition({...morePosition, top : top,left : left})
    setprojectMore(item)
    }
    else{
      setprojectMore(null)
    }
  }
  return (
    <>
      {space.projectName && (
        <div className="collapse-content ">
          {space.projectName.map((project: any) => (
            <div
              className="pb-3 font-medium flex justify-between items-center group/content"
              key={project}
            >
              {project}
              <span className="cursor-pointer hidden group-hover/content:block z-10" onClick={(event)=> handleItemClick(event ,project)}>
                <BsThreeDots />
              </span>

              
            </div>
          ))}


        </div>
      )}


      {projectMore && 
        createPortal(
          <SideMore sideMoreState="تسک" morePosition={morePosition} />,
          document.body        
        ) 
      }    
          
    </>
  );
}

export default ProjectList;
