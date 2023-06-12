import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { deleteProject, resetPostProject } from "../../../services/app/store";
import { toast } from "react-toastify";

import {
  fetchBoards,
  setSelectedId,
} from "../../../services/features/boards/boardSlice";
import { createPortal } from "react-dom";
import SideMore from "../../modals/Small/SideMore";
import { setSelectedProject } from "../../../services/app/store";
import { useLocation } from "react-router-dom";

type Projects = {
  projects: [];
};

function ProjectList({ projects }: Projects) {
  const dispatch = useAppDispatch();
  const Location = useLocation();
  const { projects : projectState } = useAppSelector((state) => state.boards);

  const [projectMore, setprojectMore] = useState({
    id : '',
    modal : ''
  });
  const [morePosition, setMorePosition] = useState<object>({
    top: 0,
    left: 0,
  });

  const {isErrorPost , isLoadingPost ,isSuccessPost,messagePost } = useAppSelector(state => state.projects)

  useEffect(()=> {
    if(isErrorPost){
      toast.dismiss();
      toast.error(`${messagePost}`);
      dispatch(resetPostProject());
    }

    if(isSuccessPost ){
      toast.dismiss();
      toast.success(`${messagePost}`,{rtl:true})
      dispatch(resetPostProject());
    }
  }, [isErrorPost ,isLoadingPost , isSuccessPost])



  // open or close modal toggle
  const handleItemClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    name: string,
    id : string
  ) => {
    if (projectMore.modal === '') {
      const top = `${e.clientY}px`;
      const left = `${e.clientX}px`;
      setMorePosition({ ...morePosition, top: top, left: left });
      setprojectMore({...projectMore , modal : name , id :id });
    } else {
      setprojectMore({...projectMore , modal : '' , id : ''});
    }
  };

  // handle delete project 
  const  handleDeleteProject = () =>{
    console.log(projectMore.id);
    dispatch(deleteProject(projectMore.id))
  //  dispatch(resetPostProject())
  }

  return (
    <>
      {projects.map(({ _id, name }) => (
        <div
          className="pb-3 font-medium flex justify-between items-center cursor-pointer group/content"
          key={_id}
          onClick={(event) => {
            if (Location.pathname === "/columnview") {
              const projectIndex = projectState.findIndex((project) => {
                return project.projectId === _id;
              });
              if (projectIndex < 0) dispatch(fetchBoards(_id));
            } else {
              event.stopPropagation();
            }
            dispatch(setSelectedId(_id));
            dispatch(setSelectedProject(name));
          }}
        >
          {name}
          <span
            className=" left-2 p-3 cursor-pointer hidden group-hover/content:block z-10"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              handleItemClick(e, name ,_id);
              e.stopPropagation();
            }}
          >
            <BsThreeDots />
          </span>
        </div>
      ))}

      {projectMore.modal &&
        createPortal(
          <SideMore 
            sideMoreState="تسک" 
            morePosition={morePosition}
            handleDelete={handleDeleteProject}
            id={projectMore.id}
            handleItemClick={handleItemClick}
          />,
          document.body
        )}
    </>
  );
}

export default ProjectList;
