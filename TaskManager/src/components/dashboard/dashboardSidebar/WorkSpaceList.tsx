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

const WorkSpaceList = ({ workSpaces }: WorkSpaceProps) => {
  const [workspaceMore, setWorkspaceMore] = useState(false);
  const colors = [
    "118C80",
    "F1A25C",
    "F92E8F",
    "2E7FF9",
    "C074D1",
    "71FDA9",
    "FFE605",
  ];

  return (
    <div className="my-5 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
      {workSpaces.map(({ name, _id, projects }) => {
        return (
          <div className="collapse group/title" key={_id}>
            <input type="checkbox" className="p-0 m-0" />
            <div className="relative collapse-title font-medium flex justify-between items-center gap-2 p-0 m-0">
              <div className="flex gap-2 group">
                <div
                  className={`w-5 h-5 rounded bg-${
                    colors[Math.floor(Math.random() * colors.length)]
                  }`}
                ></div>
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

/**************************************************** */
/**************************************************** */
/**************************************************** */
/**************************************************** */
// import { useState } from "react";
// import ProjectList from "./ProjectList";

// type WorkSpaceListProps = {
//   workSpaces: any
//   name: string;
//   id: string;
//   projects: any;
// };
// const WorkSpaceList = ({ name, id, projects }: WorkSpaceListProps) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="mt-8">
//       <div
//         className="flex items-center gap-2 cursor-pointer"
//         onClick={() => {
//           setIsExpanded(!isExpanded);
//           // setWorkSpaceID(id);
//         }}
//       >
//         <h3>{name}</h3>
//         <div className="text-sm font-normal flex items-center justify-between"></div>
//       </div>
//       {isExpanded && (
//         <div className="flex flex-col">
//           <ProjectList projects={projects} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkSpaceList;
