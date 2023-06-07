import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import {
  fetchProjects,
  selectProjects,
} from "../../../services/features/projects/projectSlice";
import { selectWorkSpaces } from "../../../services/features/workSpaceList/workSpacesSlice";
import WorkSpaceList from "./WorkSpaceList";

type Project = {
  _id: string;
  name: string;
  workspace: string;
  members: [];
  boards: [];
};

function ProjectList({ workSpaceId }) {
  // const [ids,setIds] = useState(workspaceId)
  // const { workSpace } = useAppSelector(selectWorkSpace);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjects(workSpaceId));
  }, [dispatch]);

  // if (isSuccess) {
  //   console.log(workspaceId);
  // } else if (isError) {
  //   console.log(isError);
  // }
  const findProject = projects.filter((project) => {
    if(project.workspace === workSpaceId){
      return project
    }
  });
  console.log(projects);

  return (
    <>
      {isSuccess &&
        findProject.map(({ _id, name }) => (
          <div
            className="pb-3 font-medium flex justify-between items-center group/content"
            key={_id}
          >
            {name}
            <span className="cursor-pointer hidden group-hover/content:block z-10">
              <BsThreeDots />
            </span>
          </div>
        ))}
    </>
  );
}

export default ProjectList;
