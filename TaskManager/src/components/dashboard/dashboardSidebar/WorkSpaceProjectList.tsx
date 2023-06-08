import React from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../services/app/hook";
import { selectWorkSpaces } from "../../../services/features/workSpaceList/workSpacesSlice";
import ProjectList from "./ProjectList";


type Props = {
  workspaceId: string;
};

const WorkSpaceProjectList: React.FC<Props> = ({ workspaceId }) => {
  const workspaces = useAppSelector(selectWorkSpaces);
//   const projects = useAppSelector(selectProjectsByWorkspaceId(workspaceId));

  const workspace = workspaces.workSpaces.find((w) => w._id === workspaceId);

  if (!workspace) {
    // handle when workspace is not found
    return <div>Workspace not found</div>;
  }

  return (
    <>
      <h2>{workspace.name} Projects</h2>
      <ProjectList projects={projects} />
    </>
  );
};

export default WorkSpaceProjectList;
