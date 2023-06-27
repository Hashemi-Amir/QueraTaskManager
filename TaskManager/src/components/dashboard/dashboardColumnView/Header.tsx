import { useState } from "react";
import { createPortal } from "react-dom";
import { BsThreeDots, BsPlus } from "react-icons/bs";
import Modal from "../../../layout/Modal";
import AddNewTask from "../../modals/Large/AddNewTask";
import BoardMore from "../../modals/Small/BoardMore";
import { useAppDispatch } from "../../../services/app/hook";
import { deleteBoard, fetchCreateTask } from "../../../services/app/store";

type HeaderProps = {
  title: string;
  number: number;
  borderColor: string;
  id: string;
};
const Header = ({ title, number, borderColor, id }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [boardModal, setBoardModal] = useState({
    modal: false,
    position: { top: 0, left: 0 },
  });

  const dispatch = useAppDispatch();
  const handleCardHover = (isHovering: boolean) => {
    setIsHovered(isHovering);
  };

  // toggle board modal and set modal position
  const handleBoardModal = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const pos: { top: number; left: number } = {
      top: e?.clientY || 0,
      left: e?.clientX || 0,
    };
    setBoardModal({ ...boardModal, modal: !boardModal.modal, position: pos });
  };

  // handle delete board with dispatch
  const handleDeleteBoard = () => {
    dispatch(deleteBoard(id));
    handleBoardModal();
  };

  // toggle modal new task
  const handleNewTaskModal = () => setNewTaskModal(!newTaskModal);
  const handleAddNewTask = (data: (string | undefined)[]) => {
    const [name, description, deadline] = [...data];
    const formData = { name, description, boardId: id, deadline };
    dispatch(fetchCreateTask(formData));
    handleNewTaskModal();
  };
  return (
    <div
      className={`flex items-center justify-between w-[250px] bg-white sticky top-0 h-10 rounded px-3 py-2 mb-5 border border-t-2 text-1E1E1E ${borderColor} shadow-[0px_2px_8px_rgba(0,0,0,0.18)] `}
      onMouseOver={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
    >
      <div className="flex items-center gap-1 text-ellipsis whitespace-nowrap overflow-x-auto scrollbar-none">
        <div>{title}</div>
        <div className="flex justify-center items-center h-4 w-3 p-1 rounded-full bg-F4F4F4 text-[10px] leading-5">
          {number}
        </div>
      </div>
      {isHovered && (
        <div className="flex items-center gap-1 pr-3">
          <span
            className="relative hover:scale-110"
            onClick={(e) => handleBoardModal(e)}
          >
            <BsThreeDots />
          </span>
          <span
            className="hover:scale-110 text-xl data-[title]:text-red-500"
            title="افزودن تسک"
            onClick={handleNewTaskModal}
          >
            <BsPlus />
          </span>
        </div>
      )}

      {boardModal.modal &&
        createPortal(
          <BoardMore
            position={boardModal.position}
            handleDeleteBoard={handleDeleteBoard}
            handleBoardModal={handleBoardModal}
            id={id}
          />,
          document.body
        )}

      {newTaskModal &&
        createPortal(
          <Modal>
            <AddNewTask
              handleNewTaskModal={handleNewTaskModal}
              handleAddNewTask={handleAddNewTask}
            />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default Header;
