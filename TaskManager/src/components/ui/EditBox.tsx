import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import {
  editBoardName,
  editProjectName,
  resetPostProject,
  resetPostWorkspace,
  updateWorkSpace,
} from "../../services/app/store";
import { setSelectedProject } from "../../services/features/projects/projectSlice";
import { setSelectedWorkSpaceHeader } from "../../services/features/workSpaceList/workSpacesSlice";
import Button from "./Button";
import { MorePosition } from "../dashboard/dashboardSidebar/ProjectList";

type EditBoxPosition = {
  top?: number;
  left?: number;
};

type EditBoxProps = {
  status: string;
  editPosition: MorePosition;
  id?: string;
};

const EditBox = ({ status, editPosition, id }: EditBoxProps) => {
  const dispatch = useAppDispatch();

  // get username and send to updateWorkSpace
  const user = useAppSelector((state) => state.auth.user);
  const { isLoadingPost: workspaceLoading } = useAppSelector(
    (state) => state.workSpaces
  );
  const { isErrorPost: projectLoading } = useAppSelector(
    (state) => state.projects
  );

  const loading = projectLoading || workspaceLoading;
  const handleEdit = () => {
    const val = document.querySelector<HTMLInputElement>("#edit")?.value;
    const data = [val, id, user?.username];


    if (status === "workspace" && val?.trim()) {
      dispatch(updateWorkSpace(data));
      dispatch(resetPostWorkspace());
      dispatch(setSelectedWorkSpaceHeader(val.trim()));
    }

    if (status === "project" && val?.trim()) {
      const data = [id, val];
      dispatch(editProjectName(data));
      dispatch(resetPostProject());
      dispatch(setSelectedProject(val.trim()));
    }

    if (status === "board" && val?.trim()) {
      const data = [id, val];
      dispatch(editBoardName(data));
    }
  };
  return (
    <div
      style={{ top: editPosition.top, left: editPosition.left }}
      className=" h-20 w-48 p-2 mr-16 mt-5 absolute flex items-center z-50 bg-white shadow-xl border rounded-xl"
    >
      <input
        type="text"
        id="edit"
        className="w-4/5 border border-AAAAAA h-10 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
      />

      <div className="mr-2">
        {workspaceLoading ? (
          <button className="disabled:pointer-events-none  bg-208D8E hover:bg-[#1d7f80] focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all w-full h-10 p-2.5 text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md">
            <BsThreeDots className="animate-ping" />
          </button>
        ) : (
          <Button value="ویرایش" onClick={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default EditBox;
