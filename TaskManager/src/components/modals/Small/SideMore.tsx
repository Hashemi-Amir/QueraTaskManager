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
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import SelectBoard from "../Medium/SelectBoard";
import {
  fetchCreateTask,
  toggleMediumModal,
  toggleSmallModal,
} from "../../../services/app/store";
import { MorePosition } from "../../dashboard/dashboardSidebar/ProjectList";

type SideMoreProps = {
  sideMoreState: string;
  morePosition: MorePosition;
  handleDelete?: () => void;
  id?: string;
  handleEditMood: (toggle: string | undefined) => void;
};

const SideMore = ({
  sideMoreState,
  morePosition,
  handleDelete,
  id,
  handleEditMood,
}: SideMoreProps) => {
  const liStyle =
    "w-full flex items-center text-sm font-normal text-323232   mt-3 cursor-pointer dark:text-[#F7F9F9]";

  const [boardList, setBoardList] = useState([]);
  const [newTaskStatus, setNewTaskStatus] = useState("ستون");
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [confirm, setConfirm] = useState(false);
  const { selectedProjectId, projects } = useAppSelector(
    (state) => state.boards
  );

  const dispatch = useAppDispatch();
  const { medium } = useAppSelector((state) => state.modals);

  const newTaskState = () => {
    const projectIndex = projects.findIndex(
      (workspace) => workspace.projectId === selectedProjectId
    );
    const projectsBoards = projects[projectIndex].projectBoards.map(
      (board) => board
    );
    setBoardList(projectsBoards as never[]);
    setNewTaskStatus("ستون");
  };
  const handleSelectBoardList = (boardId: string) => {
    setSelectedBoardId(boardId);
    setNewTaskStatus("تسک");
  };

  const handleAddNewTask = (data: (string | undefined)[]) => {
    data.push(selectedBoardId);
    const [name, description, deadline, boardId] = [...data];
    const formData = { name, description, deadline, boardId };
    dispatch(fetchCreateTask(formData));
  };
  return (
    <>
      <ul
        style={{ top: morePosition.top, left: morePosition.left }}
        className={`absolute mt-3 z-50  w-52 min-w-max  bg-white shadow-lg p-3 rounded-lg dark:bg-[#15202B]`}
      >
        {/* add task or project */}
        <li className="w-full flex items-center text-323232 text-sm font-normal  mt-3 cursor-pointer dark:text-[#F7F9F9]">
          <span className="ml-4 text-xl">
            <AiOutlinePlus />
          </span>
          <span
            onClick={() => {
              sideMoreState === "تسک" && newTaskState();
              dispatch(toggleMediumModal(sideMoreState));
            }}
          >
            ساختن {sideMoreState === "تسک" ? "تسک" : "پروژه"} جدید
          </span>
          {medium === "ورک اسپیس" &&
            createPortal(
              <Modal>
                <NewProject id={id} />
              </Modal>,
              document.body
            )}

          {medium === "تسک" &&
            createPortal(
              <Modal>
                {newTaskStatus === "ستون" ? (
                  <SelectBoard
                    data={boardList}
                    selectedHandle={handleSelectBoardList}
                    status={newTaskStatus}
                  />
                ) : (
                  <AddNewTask handleAddNewTask={handleAddNewTask} />
                )}
              </Modal>,
              document.body
            )}
        </li>
        {/* edit name task or project */}
        <li
          className={liStyle}
          onClick={() => {
            dispatch(toggleSmallModal(""));
            handleEditMood(id);
          }}
        >
          <span className="ml-4 text-xl">
            <SlNote />
          </span>
          <span>
            ویرایش نام {sideMoreState === "تسک" ? "پروژه" : "ورک اسپیس"}
          </span>
        </li>
        {/* copy Link */}
        <li className={liStyle}>
          <span className="ml-4 text-xl">
            <AiOutlineLink />
          </span>
          <span>کپی لینک</span>
        </li>
        {/* delete */}

        <li
          className={`${liStyle} text-9F0000 dark:text-[#F7F9F9]`}
          onClick={() => setConfirm(true)}
        >
          {confirm ? (
            <div className="flex items-center justify-around border p-2 rounded-md ">
              <p className="text-xs text-black dark:text-[#F7F9F9] ">
                از حذف {sideMoreState === 'تسک' ? 'پروژه' : 'ورک اسپیس'} مطمئنید؟
              </p>
              <button
                className="focus:outline-none mr-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirm(false);
                }}
              >
                خیر
              </button>
              <button
                className="text-208D8E mr-2 focus:outline-none text-xs dark:text-[#F1B127]"
                onClick={handleDelete}
              >
                بله
              </button>
            </div>
          ) : (
            <>
              <span className="ml-4 text-xl">
                <BsTrash />
              </span>
              <span>حذف</span>
            </>
          )}
        </li>

        {/* share workspace or project */}
        <li
          className="w-full relative flex  items-center mt-4"
          onClick={() => dispatch(toggleMediumModal(`اشتراک ${sideMoreState}`))}
        >
          <span className="absolute right-5 text-2xl text-white dark:text-[#0F111A] ">
            <BiShareAlt />
          </span>
          <Button
            value="اشتراک گذاری"
            className="hover:bg-208D8E hover:text-white"
          />
        </li>

        {medium === "اشتراک ورک اسپیس" &&
          createPortal(
            <Modal>
              <ShareModal ModalTitle="ورک اسپیس" id={id} />
            </Modal>,
            document.body
          )}
        {medium === "اشتراک تسک" &&
          createPortal(
            <Modal>
              <ShareModal ModalTitle="پروژه" id={id} />
            </Modal>,
            document.body
          )}
      </ul>
    </>
  );
};

export default SideMore;
