import { createPortal } from "react-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import EditBox from "../../ui/EditBox";
import { useState } from "react";



type BoardMoreProps = {
  position : {
    top : number,
    left : number
  },
  handleDeleteBoard : () => void,
  handleBoardModal : () => void,
  id : string
}

const BoardMore = ({position ,handleDeleteBoard,handleBoardModal ,id}:BoardMoreProps) => {
  const liStyle =
    "flex items-center cursor-pointer mt-3 text-sm text-[#1E1E1E] font-normal";

  const [editBox, setEditBox] = useState({
    modal : false,
    position : {top:0,left:0}
  });
  
  const handleEditBox = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
    const pos:{top:number , left: number} = { top: e?.clientY || 0, left: e?.clientX || 0 };
    setEditBox({ ...editBox, modal : !editBox.modal,position: pos});
  }
  return (
    <ul 
      style={{top:position.top,left:position.left}}
      className="absolute top-7 w-40 mt-1 left-2 rounded-lg p-3 z-50 bg-white shadow-lg">
      <li className={liStyle} onClick={(e) => handleEditBox(e)}>
        <span className="text-sm">
          <SlNote />
        </span>
        <p className="mr-2">ویرایش نام ستون</p>
      </li>
      {editBox.modal && createPortal(
        <EditBox
          id={id} 
          status="board" 
          handleItemClick={handleBoardModal} 
          editPosition={editBox.position} />,
        document.body
      )}

      <li className={liStyle}>
        <span className="text-sm">
          <AiOutlinePlus />
        </span>
        <p className="mr-2">افزودن تسک</p>
      </li>

      <li className={liStyle}>
        <span className="text-sm">
          <BiArchiveIn />
        </span>
        <p className="mr-2">آرشیو تمام تسک‌ها</p>
      </li>

      <li className={liStyle} onClick={handleDeleteBoard}>
        <span className="text-sm">
          <BsTrash />
        </span>
        <p className="mr-2">حذف ستون</p>
      </li>
    </ul>
  );
};

export default BoardMore;
