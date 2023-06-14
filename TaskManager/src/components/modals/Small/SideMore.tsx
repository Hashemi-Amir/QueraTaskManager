import { AiOutlinePlus, AiOutlineLink } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { VscSymbolColor } from "react-icons/vsc";
import Button from "../../ui/Button";
import { BiShareAlt } from "react-icons/bi";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../../layout/Modal";
import NewProject from "../Medium/NewProject";
import CheckBoxColor from "../../ui/CheckBoxColor";
import ShareModal from "../Medium/ShareModal";
import AddNewTask from "../Large/AddNewTask";
import EditBox from "../../ui/EditBox";


type morePosition = {
  top?: number;
  left?: number;
};
type HandleDeleteProjectType = (
  e?: React.MouseEvent<HTMLElement, MouseEvent>,
  name?: string,
  id?: string
) => void;
type SideMoreProps = {
  sideMoreState: string;
  morePosition: morePosition;
  handleDelete?: () => void;
  id?: string;
  handleItemClick : HandleDeleteProjectType;
};

type EditBoxPosition = {
  top?: number;
  left?: number;
};

const SideMore = ({
  sideMoreState,
  morePosition,
  handleDelete,
  id,
  handleItemClick,
}: SideMoreProps) => {
  
  const liStyle =
    "w-full flex items-center text-sm font-normal  mt-3 cursor-pointer";
  const dataColor = [
    { id: 1, color: "bg-[#84C6A1]" },
    { id: 2, color: "bg-[#78C6B0]" },
    { id: 3, color: "bg-[#76BC86]" },
    { id: 4, color: "bg-[#80DC69]" },
    { id: 5, color: "bg-[#E46161]" },
    { id: 6, color: "bg-[#E17E80]" },
    { id: 7, color: "bg-[#EC8182]" },
    { id: 8, color: "bg-[#F3C567]" },
    { id: 9, color: "bg-[#B9995E]" },
    { id: 10, color: "bg-[#E57A57]" },
    { id: 11, color: "bg-[#F1A25C]" },
    { id: 12, color: "bg-[#E28A60]" },
    { id: 13, color: "bg-[#6897C2]" },
    { id: 14, color: "bg-[#74AADD]" },
    { id: 15, color: "bg-[#3C45E7]" },
    { id: 16, color: "bg-[#6DAFCE]" },
    { id: 17, color: "bg-[#6CB2F7]" },
    { id: 18, color: "bg-[#9286EA]" },
    { id: 19, color: "bg-[#C074D1]" },
    { id: 20, color: "bg-[#486774]" },
  ];

  const [newModal, setNewModal] = useState({
    project: false,
    task: false,
    editWorkSpace: false,
    editProject: false,
    color: false,
    shareWorkSpace: false,
    shareProject: false,
  });

  const [editPosition, setEditPosition] = useState<EditBoxPosition>({});

  const [selectedColor, setSelectedColor] = useState({
    color: "bg-[#7D828C]",
    id: 0,
  });


  const handleModalProject = () => {
    if (sideMoreState === "ورک اسپیس") {
      setNewModal({ ...newModal, project: !newModal.project });
    } else if (sideMoreState === "تسک") {
      setNewModal({ ...newModal, task: !newModal.task });
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const top = e.clientY;
    const left = e.clientX - 200;
    if (sideMoreState === "ورک اسپیس") {
      setNewModal({ ...newModal, editWorkSpace: !newModal.editWorkSpace });
      setEditPosition({ ...editPosition, top: top, left: left });
    } else if (sideMoreState === "تسک") {
      setNewModal({ ...newModal, editProject: !newModal.editProject });
      setEditPosition({ ...editPosition, top: top, left: left });
    }
  };

  const handleColor = () => {
    setNewModal({ ...newModal, color: !newModal.color });
  };
  const handleCheckBoxColor = (data: any): any => {
    setSelectedColor({ ...selectedColor, color: data.color, id: data.id });
    handleColor();
  };

  const handleShare = () => {
    if (sideMoreState === "ورک اسپیس") {
      setNewModal({ ...newModal, shareWorkSpace: !newModal.shareWorkSpace });
    } else if (sideMoreState === "تسک") {
      setNewModal({ ...newModal, shareProject: !newModal.shareProject });
    }
  };

  return (
    <>
      <ul
        style={{ top: morePosition.top, left: morePosition.left }}
        className="absolute mt-3 z-50 w-52 bg-white shadow-lg p-3 rounded-lg"
      >
        <li className="w-full flex items-center text-sm font-normal  mt-3 cursor-pointer">
          <span className="ml-4 text-xl">
            <AiOutlinePlus />
          </span>
          <span onClick={handleModalProject}>
            ساختن {sideMoreState === "تسک" ? "تسک" : "پروژه"} جدید
          </span>
          {newModal.project &&
            createPortal(
              <Modal>
                <NewProject handleModalProject={handleModalProject} id={id} handleItemClick={handleItemClick}/>
              </Modal>,
              document.body
            )}

          {newModal.task &&
            createPortal(
              <Modal>
                <AddNewTask handleNewTaskModal={handleModalProject} />
              </Modal>,
              document.body
            )}
        </li>
        <li className={liStyle} onClick={handleEdit}>
          <span className="ml-4 text-xl">
            <SlNote />
          </span>
          <span>
            ویرایش نام {sideMoreState === "تسک" ? "پروژه" : "ورک اسپیس"}
          </span>
        </li>
        {newModal.editWorkSpace &&
          createPortal(
            <EditBox
              status={"workspace"}
              editPosition={editPosition}
              id={id}
              handleItemClick={handleItemClick}
            />,
            document.body
          )}
        {newModal.editProject &&
          createPortal(
            <EditBox
            status={"project"}
              editPosition={editPosition}
              id={id}
              handleItemClick={handleItemClick}
            />,
            document.body
          )}
        {sideMoreState === "ورک اسپیس" && (
          <li className={liStyle} onClick={handleColor}>
            <span className="ml-4 text-xl">
              <VscSymbolColor />
            </span>
            <span>ویرایش رنگ</span>
          </li>
        )}

        {newModal.color && (
          <ul className="absolute top-14 mr-28 border w-40 h-32 flex content-between flex-wrap z-50 bg-white rounded-lg py-2 px-1 shadow-xl">
            {dataColor.map((li) => (
              <CheckBoxColor
                key={li.id}
                data={li}
                selectedColor={selectedColor}
                handleCheckBoxColor={handleCheckBoxColor}
              />
            ))}
          </ul>
        )}
        <li className={liStyle}>
          <span className="ml-4 text-xl">
            <AiOutlineLink />
          </span>
          <span>کپی لینک</span>
        </li>
        <li
          className={`${liStyle} text-9F0000`}
          onClick={handleDelete}
        >
          <span className="ml-4 text-xl">
            <BsTrash />
          </span>
          <span>حذف</span>
        </li>

        <li
          className="w-full relative flex  items-center mt-4"
          onClick={handleShare}
        >
          <span className="absolute right-5 text-2xl text-white ">
            <BiShareAlt />
          </span>
          <Button
            value="اشتراک گذاری"
            className="hover:bg-208D8E hover:text-white"
          />
        </li>
        {newModal.shareWorkSpace &&
          createPortal(
            <Modal>
              <ShareModal
                ModalTitle="به اشتراک گذاری ورک اسپیس"
                shareModalHandler={handleShare}
                id={id}
              />
            </Modal>,
            document.body
          )}
        {newModal.shareProject &&
          createPortal(
            <Modal>
              <ShareModal
                ModalTitle="به اشتراک گذاری پروژه"
                shareModalHandler={handleShare}
                id={id}
              />
            </Modal>,
            document.body
          )}
      </ul>
    </>
  );
};

export default SideMore;
