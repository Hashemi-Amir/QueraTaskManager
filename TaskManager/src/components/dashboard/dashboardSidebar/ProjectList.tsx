import { SetStateAction, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { createPortal } from "react-dom";
import SideMore from "../../modals/Small/SideMore";

type Projects = {
  projects: [];
};

function ProjectList({ projects }: Projects) {
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
      {projects.map(({ _id, name }) => (
        <div
          className="pb-3 font-medium flex justify-between items-center cursor-pointer group/content"
          key={_id}
        >
          {name}
          <span className="cursor-pointer hidden group-hover/content:block z-10" onClick={(e) => handleItemClick(e,name) }>
            <BsThreeDots />
          </span>
        </div>
      ))}


      {projectMore && createPortal(
        <SideMore sideMoreState="تسک" morePosition={morePosition} />
        ,
        document.body
      )}
    </>
  );
}

export default ProjectList;