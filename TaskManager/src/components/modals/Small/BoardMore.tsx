import { createPortal } from "react-dom";
import { BsTrash } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import EditBox from "../../ui/EditBox";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { toggleXSmallModal } from "../../../services/app/store";
import Modal from "../../../layout/Modal";
import { MorePosition } from "../../dashboard/dashboardSidebar/ProjectList";

type BoardMoreProps = {
  position : MorePosition;
  handleDeleteBoard: () => void;
  id: string;
  handleEditMood : (arg:string)=> void
};

const BoardMore = ({ position, handleDeleteBoard, id ,handleEditMood}: BoardMoreProps) => {
  const liStyle =
    "flex items-center cursor-pointer mt-3 text-sm text-[#1E1E1E] font-normal";

  const dispatch = useAppDispatch();
  const { xSmall } = useAppSelector((state) => state.modals);
  const [editBox, setEditBox] = useState({
    position: { top: 0, left: 0 },
  });

  const handleEditBox = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const pos: { top: number; left: number } = {
      top: e?.clientY || 0,
      left: e?.clientX || 0,
    };
    setEditBox({ ...editBox, position: pos });
  };
  return (
    <>
      <ul
        // style={{ top: position.top, left: position.left }}
        className="absolute top-7  w-40 mt-1 left-2 rounded-lg p-3 z-50 bg-white shadow-lg"
      >
        <li
          className={liStyle}
          onClick={(e) => {
            // handleEditBox(e);
            // dispatch(toggleXSmallModal("boardMore"));
            handleEditMood(id)
          }}
        >
          <span className="text-sm">
            <SlNote />
          </span>
          <p className="mr-2">ویرایش نام ستون</p>
        </li>

        <li className={liStyle} onClick={handleDeleteBoard}>
          <span className="text-sm">
            <BsTrash />
          </span>
          <p className="mr-2">حذف ستون</p>
        </li>
      </ul>

      {xSmall === "boardMore" &&
        createPortal(
          <Modal className="!bg-transparent">
            <EditBox id={id} status="board" editPosition={editBox.position} />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default BoardMore;
