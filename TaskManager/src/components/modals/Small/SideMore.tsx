import { AiOutlinePlus, AiOutlineLink } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import Button from "../../ui/Button";
import { BiShareAlt } from "react-icons/bi";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../../layout/Modal";
import NewProject from "../Medium/NewProject";
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
  handleItemClick: HandleDeleteProjectType;
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
  const [newModal, setNewModal] = useState("");
  const [editPosition, setEditPosition] = useState<EditBoxPosition>({});


  // toggle all modals inside sideMore
  const handleAllSideMoreModals = (
    modalName: string,
    event?: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    // set edit box position
    if (modalName === "ویرایش ورک اسپیس" || modalName === "ویرایش تسک") {
      const top = event?.clientY;
      const left = event?.clientX;
      const resLeft = left && left - 200;
      setEditPosition({ ...editPosition, top: top, left: resLeft });
    }
    // set sidemore modals state
    setNewModal(modalName);
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
          <span onClick={() => handleAllSideMoreModals(sideMoreState)}>
            ساختن {sideMoreState === "تسک" ? "تسک" : "پروژه"} جدید
          </span>
          {newModal === "ورک اسپیس" &&
            createPortal(
              <Modal>
                <NewProject
                  handleAllSideMoreModals={handleAllSideMoreModals}
                  id={id}
                  handleItemClick={handleItemClick}
                />
              </Modal>,
              document.body
            )}

          {newModal === "تسک" &&
            createPortal(
              <Modal>
                <AddNewTask handleNewTaskModal={handleAllSideMoreModals} />
              </Modal>,
              document.body
            )}
        </li>
        <li
          className={liStyle}
          onClick={(event) =>
            handleAllSideMoreModals(`ویرایش ${sideMoreState}`, event)
          }
        >
          <span className="ml-4 text-xl">
            <SlNote />
          </span>
          <span>
            ویرایش نام {sideMoreState === "تسک" ? "پروژه" : "ورک اسپیس"}
          </span>
        </li>
        {newModal === `ویرایش ورک اسپیس` &&
          createPortal(
            <EditBox
              status={"workspace"}
              editPosition={editPosition}
              id={id}
              handleItemClick={handleItemClick}
            />,
            document.body
          )}
        {newModal === `ویرایش تسک` &&
          createPortal(
            <EditBox
              status={"project"}
              editPosition={editPosition}
              id={id}
              handleItemClick={handleItemClick}
            />,
            document.body
          )}

        <li className={liStyle}>
          <span className="ml-4 text-xl">
            <AiOutlineLink />
          </span>
          <span>کپی لینک</span>
        </li>
        <li className={`${liStyle} text-9F0000`} onClick={handleDelete}>
          <span className="ml-4 text-xl">
            <BsTrash />
          </span>
          <span>حذف</span>
        </li>

        <li
          className="w-full relative flex  items-center mt-4"
          onClick={() => handleAllSideMoreModals(`اشتراک ${sideMoreState}`)}
        >
          <span className="absolute right-5 text-2xl text-white ">
            <BiShareAlt />
          </span>
          <Button
            value="اشتراک گذاری"
            className="hover:bg-208D8E hover:text-white"
          />
        </li>
        {newModal === "اشتراک ورک اسپیس" &&
          createPortal(
            <Modal>
              <ShareModal
                ModalTitle="به اشتراک گذاری ورک اسپیس"
                shareModalHandler={handleAllSideMoreModals}
                id={id}
              />
            </Modal>,
            document.body
          )}
        {newModal === "اشتراک تسک" &&
          createPortal(
            <Modal>
              <ShareModal
                ModalTitle="به اشتراک گذاری پروژه"
                shareModalHandler={handleAllSideMoreModals}
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
