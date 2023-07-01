import { useState } from "react";
import { CiTextAlignRight } from "react-icons/ci";
import ProfileButton from "../../ui/ProfileButton";
import { FiCheckCircle, FiFlag } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { Draggable } from "react-beautiful-dnd";
import TaskInfo from "../../taskInformation/TaskInfo";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../../../services/app/hook";
import { fetchDeleteTask } from "../../../services/app/store";
import { Link } from "react-router-dom";

export type taskAssignsType = {
  _id: string;
  username: string;
  email: string;
};

export type commentType = {
  _id: string; // comment _id
  text: string;
  user: {
    _id: string; // user _id
    username: string;
    firstname: string;
    email: string;
  };
  task: string;
  createdAt: string;
};

export type Task = {
  _id: string;
  name: string;
  description: string;
  label?: [];
  board?: string;
  taskAssigns: taskAssignsType[];
  comments: commentType[];
  position: number;
  deadline: string;
  borderColor: string;
  title: string;
};

const TaskCard = ({
  name,
  description,
  _id,
  position,
  comments,
  taskAssigns,
  board,
  deadline,
  borderColor,
  title,
}: Task) => {
  const taskInfo = {
    name,
    description,
    _id,
    comments,
    taskAssigns,
    position,
    board,
    deadline,
    borderColor,
    title
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseTaskInfo = () => {
    setIsOpen(false);
  };

  const dispatch = useAppDispatch();
  const handleCardHover = (isHovering: boolean) => {
    setIsExpanded(isHovering);
  };

  const handleDeleteTask = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(fetchDeleteTask(_id));
  };

  return (
    <>
      <Draggable key={_id} draggableId={_id} index={position}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`border w-[250px] rounded p-3 bg-white text-1E1E1E shadow-[0px_6px_8px_rgba(0,0,0,0.14)] mb-3 dark:bg-[#15202B] dark:text-[#F7F9F9] dark:border-[#F1B127] dark:shadow-[0px_5px_7px_rgba(255,255,255,0.15)]`}
            onMouseOver={() => handleCardHover(true)}
            onMouseLeave={() => handleCardHover(false)}
            onClick={() => setIsOpen(true)}
          >
            <div className="flex justify-between items-baseline mb-2">
              <div className="h-4 font-medium leading-4 text-right text-534D60 text-[10px] dark:text-inherit">
                {name}
              </div>
              <Link className="w-fit" to="/personalinfo">
                <ProfileButton
                  className={`w-6 h-6 pt-[3px] text-[10px] ${
                    isExpanded ? "visible" : "invisible"
                  }
            `}
                />
              </Link>
            </div>
            <div className="flex items-center justify-start mb-5 gap-1">
              <div className="font-medium text-xs text-0E0E0E leading-4 text-right dark:text-inherit">
                {description}
              </div>
              <div className="text-xs text-BDC0C6 ">
                <CiTextAlignRight />
              </div>
            </div>
            <div className="flex justify-start items-center pb-5 text-[10px] gap-1">
              <span className="text-FB0606">
                <FiFlag />
              </span>
              <div className="text-343434">
         
                ۲۵ مهر
              </div>
              <span className="text-BDC0C6">
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-success w-3 h-3 mb-[2px]"
                      onClick={(event) => event.stopPropagation()}
                    />
                  </label>
                </div>
              </span>
              <div className="text-BDC0C6">۲۳/۲</div>
            </div>
            <div className="flex gap-3 dark:text-[#1E2124]">
              <span className="bg-BFFDE3 text-[10px] p-1 rounded-l-2xl">
                درس
              </span>
              <span className="bg-EEDFF6 text-[10px] p-1 rounded-l-2xl">
                پروژه
              </span>
            </div>
            <div
              className={` overflow-hidden justify-between flex border-t  transition-all duration-500 
        ${isExpanded ? "h-9 mt-5 pt-4" : "h-[0px] opacity-0 mt-0 pt-0"}
        `}
            >
              <div className="hover:text-208D8E hover:scale-110">
                <FiCheckCircle />
              </div>
              <div className="hover:scale-110" onClick={handleDeleteTask}>
                <BsTrash />

                {/* {colMoreModal && <ColMore />} */}
              </div>
            </div>
          </div>
        )}
      </Draggable>
      {isOpen &&
        createPortal(
          <TaskInfo
            taskInfo={taskInfo}
            handleCloseTaskInfo={handleCloseTaskInfo}
          />,
          document.body
        )}
    </>
  );
};

export default TaskCard;
