import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsThreeDots, BsPlus } from "react-icons/bs";
import Modal from "../../../layout/Modal";
import AddNewTask from "../../modals/Large/AddNewTask";
import BoardMore from "../../modals/Small/BoardMore";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import {
  deleteBoard,
  editBoardName,
  fetchCreateTask,
  toggleMediumModal,
  toggleXSmallModal,
} from "../../../services/app/store";
import { MorePosition } from "../dashboardSidebar/ProjectList";

type HeaderProps = {
  title: string;
  number: number;
  borderColor: string;
  id: string;
};

const Header = ({ title, number, borderColor, id }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [boardModal, setBoardModal] = useState<MorePosition>({
    top: 0,
    left: 0,
  });

  const dispatch = useAppDispatch();
  const { medium, xSmall } = useAppSelector((state) => state.modals);
  const [editMood, setEditMood] = useState("");
  const handleEditMood = (toggle: string | undefined) => {
    toggle && setEditMood(toggle);
  };
  const handleCardHover = (isHovering: boolean) => {
    setIsHovered(isHovering);
  };

  // toggle board modal and set modal position
  const handleBoardModal = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // Get the client's screen dimensions
    const { clientX, clientY } = e || { clientX: 0, clientY: 0 };

    // Calculate the new top position based on the client's Y-coordinate and window height
    const windowHeight = window.innerHeight;
    const top = `${Math.min(clientY, windowHeight)}px`;

    // Calculate the new left position based on the client's X-coordinate and window width
    const windowWidth = window.innerWidth;
    const left = `${Math.min(clientX, windowWidth)}px`;

    // Set the new position in the state
    setBoardModal({ ...boardModal, top, left, clientX, clientY });
  };

  useEffect(() => {
    const handleWindowResize = () => {
      const { clientX, clientY } = boardModal;

      // Calculate the new top position based on the updated window height
      const windowHeight = window.innerHeight;
      const top = clientY && `${Math.min(clientY, windowHeight)}px`;

      // Calculate the new left position based on the updated window width
      const windowWidth = window.innerWidth;
      const left = clientX && `${Math.min(clientX, windowWidth)}px`;

      setBoardModal({ ...boardModal, top, left });
    };

    // Add the resize event listener
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [boardModal]);

  // handle delete board with dispatch
  const handleDeleteBoard = () => {
    dispatch(deleteBoard(id));
  };

  const handleAddNewTask = (data: (string | undefined)[]) => {
    const [name, description, deadline] = [...data];
    const formData = { name, description, boardId: id, deadline };
    dispatch(fetchCreateTask(formData));
  };

  const handleNewBoard = () => {
    const val =
      document.querySelector<HTMLInputElement>("#editBoardName")?.value;
    const data = [id, val];
    val?.trim() && dispatch(editBoardName(data));
    setEditMood("");
  };
  return (
    <>
      <div
        className={`flex items-center justify-between w-[250px] bg-white sticky top-0 h-10 rounded px-3 py-2 mb-5 border border-t-2 text-1E1E1E  text-ellipsis whitespace-nowrap overflow-x-hidden overflow-y-hidden scrollbar-none ${borderColor} shadow-[0px_2px_8px_rgba(0,0,0,0.18)] dark:bg-[#111a22] dark:text-[#F7F9F9] dark:border-x-[#F1B127] dark:border-b-[#F1B127] dark:shadow-[0px_3px_10px_rgba(255,255,255,0.15)]`}
        onMouseOver={() => handleCardHover(true)}
        onMouseLeave={() => handleCardHover(false)}
      >
        {editMood === id ? (
          <div className="flex items-center justify-around ">
            <input
              type="text"
              className="w-2/3 h-3/4 focus:outline-none text-sm px-1 dark:bg-transparent"
              autoComplete="off"
              placeholder="نام ستون جدید"
              id="editBoardName"
            />
            <button
              className="focus:outline-none  text-sm"
              onClick={() => setEditMood("")}
            >
              لغو
            </button>
            <button
              className="text-208D8E mr-3 focus:outline-none text-sm dark:text-[#F1B127]"
              onClick={handleNewBoard}
            >
              تایید
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div>{title}</div>
              <div className="flex justify-center items-center h-4 w-4 rounded-full bg-F4F4F4 text-[10px] pt-1 dark:bg-[#f4f4f5] text-[#15202B]">
                {number}
              </div>
            </div>
            {isHovered && (
              <div className="flex items-center gap-1 pr-3 absolute dark:bg-[#111a22] px-2 left-0 cursor-pointer ">
                <span
                  className="relative hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBoardModal(e);
                    dispatch(toggleXSmallModal(id));
                  }}
                >
                  <BsThreeDots />
                </span>
                <span
                  className="hover:scale-110 text-xl data-[title]:text-red-500"
                  title="افزودن تسک"
                  onClick={() => dispatch(toggleMediumModal(id))}
                >
                  <BsPlus />
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {medium === id &&
        createPortal(
          <Modal>
            <AddNewTask handleAddNewTask={handleAddNewTask} />
          </Modal>,
          document.body
        )}
      {xSmall === id &&
        createPortal(
          <Modal className="!bg-transparent">
            <BoardMore
              position={boardModal}
              handleDeleteBoard={handleDeleteBoard}
              id={id}
              handleEditMood={handleEditMood}
            />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default Header;
