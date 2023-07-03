import { BsTrash } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { useAppDispatch } from "../../../services/app/hook";
import { toggleXSmallModal } from "../../../services/app/store";
import { MorePosition } from "../../dashboard/dashboardSidebar/ProjectList";
import { useState } from "react";
import Confirm from "../../ui/Confirm";

type BoardMoreProps = {
  position: MorePosition;
  handleDeleteBoard: () => void;
  id: string;
  handleEditMood: (arg: string) => void;
};

const BoardMore = ({
  position,
  handleDeleteBoard,
  id,
  handleEditMood,
}: BoardMoreProps) => {
  const liStyle =
    "flex items-center cursor-pointer mt-3 text-sm text-[#1E1E1E] font-normal dark:text-[#F7F9F9]";
  const [confirm, setConfirm] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <ul
        style={{ top: position.top, left: position.left }}
        className="absolute top-7  min-w-40 mt-1 left-2 rounded-lg p-3 z-50 bg-white shadow-lg dark:bg-[#15202B]"
      >
        {confirm ? (
          <li className={`${liStyle} !mt-0 p-2`}>  
            <Confirm
              status="ستون"
              cancel={setConfirm}
              accept={handleDeleteBoard}
            />
          </li>
        ) : (
          <>
            <li
              className={liStyle}
              onClick={() => {
                handleEditMood(id);
                dispatch(toggleXSmallModal(""));
              }}
            >
              <span className="text-sm">
                <SlNote />
              </span>
              <p className="mr-2">ویرایش نام ستون</p>
            </li>

            <li className={liStyle} onClick={() => setConfirm(true)}>
              <span className="text-sm">
                <BsTrash />
              </span>
              <p className="mr-2">حذف ستون</p>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default BoardMore;
