import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { updateWorkSpace } from "../../services/app/store";
import Button from "./Button";


type EditBoxPosition = {
  top?: number,
  left?: number
}

type EditBoxProps = {
  status: string;
  editPosition: EditBoxPosition;
  id?: string;
  handleItemClick: ()=> void | undefined;
};



const EditBox = ({
  status,
  editPosition,
  id,
  handleItemClick,
}: EditBoxProps) => {
  const dispatch = useAppDispatch();

  // get username and send to updateWorkSpace
  const user = useAppSelector(state => state.auth.user)
  
  const handleEdit = () => {
    const val = document.querySelector<HTMLInputElement>("#edit")?.value;
    const data = [val, id ,user?.username];
    const regex = /\S/g;
    if (status === "workspace" && typeof val === "string" && regex.test(val)) {
      dispatch(updateWorkSpace(data));
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
