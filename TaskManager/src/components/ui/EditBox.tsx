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

type EditBoxPosition = {
  top?: number;
  left?: number;
};

type HandleDeleteProjectType = (
  e?: React.MouseEvent<HTMLElement, MouseEvent>,
  name?: string,
  id?: string
) => void;

type EditBoxProps = {
  status: string;
  editPosition: EditBoxPosition;
  id?: string;
  handleItemClick: HandleDeleteProjectType;
};

const EditBox = ({
  status,
  editPosition,
  id,
  handleItemClick,
}: EditBoxProps) => {
  const dispatch = useAppDispatch();

  // get username and send to updateWorkSpace
  const user = useAppSelector((state) => state.auth.user);

  const handleEdit = () => {
    const val = document.querySelector<HTMLInputElement>("#edit")?.value;

    const data = [val, id, user?.username];

    if (status === "workspace" && val?.trim()) {
      dispatch(updateWorkSpace(data));
      dispatch(resetPostWorkspace());
      dispatch(setSelectedWorkSpaceHeader(val.trim()));
      handleItemClick();
    }

    if (status === "project" && val?.trim()) {
      const data = [id, val];
      dispatch(editProjectName(data));
      dispatch(resetPostProject());
      dispatch(setSelectedProject(val.trim()));
      handleItemClick();
    }

    if (status === "board" && val?.trim()) {
      const data = [id, val];
      dispatch(editBoardName(data));
      handleItemClick();
    }
  };
  return (
    <div
      style={{ top: editPosition.top, left: editPosition.left }}
      className=" h-20 p-2 mr-16 mt-5 absolute flex items-center z-50 bg-white shadow-xl border rounded-xl"
    >
      <input
        type="text"
        id="edit"
        className="w-4/5 border border-AAAAAA h-10 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
      />

      <div className="mr-2">
        <Button value="ویرایش" onClick={handleEdit} />
      </div>
    </div>
  );
};

export default EditBox;
