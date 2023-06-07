// import { useEffect, useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
// import SideMore from "../../modals/Small/SideMore";
// import ProjectList from "./ProjectList";
// import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
// import {
//   fetchProject,
//   selectProject,
//   setId,
// } from "../../../services/features/projects/projectSlice";

// type WorkSpaceProps = {
//   workSpaces: {
//     _id: string;
//     name: string;
//     user: string;
//     members: [];
//     projects: [];
//   }[];
// };

// const WorkSpaceList = ({ workSpaces }: WorkSpaceProps) => {
//   const [workspaceMore, setWorkspaceMore] = useState(false);

//   // const { isError, isSuccess, project } = useAppSelector(selectProject);
//   // const dispatch = useAppDispatch();
//   // useEffect(() => {
//   //   dispatch(fetchProject());
//   //   dispatch(setId(projects));
//   // }, []);

//   // if (isSuccess) {
//   //   console.log(project);
//   // } else if (isError) {
//   //   console.log(isError);
//   // }
//   console.log("work");

//   return (
//     <div className="my-5 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
//       {workSpaces.map((workSpace) => {
//         return (
//           <div className="collapse group/title" key={workSpace._id}>
//             <input type="checkbox" className="p-0 m-0" />
//             <div className="relative collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
//               <div className="flex gap-2 group">
//                 <div className={`w-5 h-5 rounded bg-208D8E}`}></div>
//                 <div>{workSpace.name}</div>
//               </div>

//               <div
//                 className="absolute left-0 cursor-pointer hidden group-hover/title:block z-10"
//                 onClick={() => setWorkspaceMore(true)}
//               >
//                 <BsThreeDots />
//               </div>
//               {workspaceMore && <SideMore sideMoreState="ورک اسپیس" />}
//             </div>
//             <div className="collapse-content">
//               <ProjectList />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default WorkSpaceList;

/**************************************************** */
/**************************************************** */
/**************************************************** */
/**************************************************** */
import { useState } from "react";
import ProjectList from "./ProjectList";
import { selectProjects } from "../../../services/features/projects/projectSlice";
import { useAppSelector } from "../../../services/app/hook";

type WorkSpaceListProps = {
  children: any;
  name: string;
  id: string;
  workSpaces : any
};
const WorkSpaceList = ({ name, id ,workSpaces}: WorkSpaceListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const transition = "transition-all delay-75 ease-in-out";
  // const [workSpaceId, setWorkSpaceID] = useState("");
  // const { isError, isSuccess, projects } = useAppSelector(selectProjects);

    console.log(workSpaces[0].projects);
    
  return (
    <div className="mt-8">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
          // setWorkSpaceID(id);
        }}
      >
        <h3>{name}</h3>
        <div className="text-sm font-normal flex items-center justify-between"></div>
      </div>
      {isExpanded && (
        <div className="flex flex-col">
          <ProjectList workSpaceId={id} />
        </div>
      )}
    </div>
  );
};

export default WorkSpaceList;
