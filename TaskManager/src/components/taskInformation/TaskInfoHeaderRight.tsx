import { RiArrowLeftSLine, RiUserAddLine } from "react-icons/ri";
import DashedBorderCard from "../ui/DashedBorderCard";
import { BsCheckSquare } from "react-icons/bs";
import { FiFlag } from "react-icons/fi";
import { taskAssignsType } from "../dashboard/dashboardColumnView/TaskCard";
import TaskAssign from "./taskAssign";
import { useState } from "react";
import { HiOutlineShare } from "react-icons/hi";

export type TaskInfoHeaderRightType = {
  taskAssigns: taskAssignsType[];
  borderColor: string;
  title: string;
};

const TaskInfoHeaderRight = ({
  taskAssigns,
  borderColor,
  title,
}: TaskInfoHeaderRightType) => {
  const [taskAssignModal, setTaskAssignModal] = useState(false);
  const colors = JSON.parse(localStorage.getItem("Colors") as string);

  const btnColor = borderColor.split("-")[2];
  const shadowColor = `shadow-[0px_0px_0px_2px_#${btnColor}]`;

  return (
    <div className="w-1/2 h-full ml-[1px] relative ">
      <div className="w-full h-14 absolute bottom-6 flex place-content-between items-center px-4">
        {/* Task Info Right */}
        <div className="h-9 flex items-center gap-7">
          {/* Status Changer */}
          <div
            className={`flex rounded-sm group hover:${shadowColor} transition-all`}
          >
            <button
              className={`w-28 h-8 text-white bg-${btnColor} p-1 justify-center truncate group-hover:rounded-s-md  group-hover:scale-110 transition-all`}
            >
              {title}
            </button>
            <button
              className={`mr-[2px] text-white bg-${btnColor} group-hover:scale-110 group-hover:rounded-e-md transition-all`}
            >
              <RiArrowLeftSLine size="24"></RiArrowLeftSLine>
            </button>
          </div>
          {/* Set To Complete */}
          <BsCheckSquare role="button" size="32" color="#BDBDBD" />

          {/* Assign task */}
          <ul dir="ltr" className="flex -space-x-2 ">
            <li onClick={() => setTaskAssignModal(true)}>
              <DashedBorderCard classes="border-C1C1C1">
                <RiUserAddLine color="#C1C1C1" size="20"></RiUserAddLine>
              </DashedBorderCard>
            </li>
            <>
              {[...taskAssigns].slice(0, 3).map((user, index) => (
                <li key={user._id} className="w-8 h-8 cursor-pointer ">
                  <div
                    className={`${colors[index]} w-full h-full rounded-full flex items-center justify-center pt-1 text-white`}
                  >
                    {user.username.substring(0, 2)}
                  </div>
                </li>
              ))}
              {taskAssigns.length > 3 && (
                <div className="w-8 h-8 cursor-pointer ">
                  <div
                    className={`bg-[#0A111B] w-full h-full rounded-full flex items-center justify-center pt-1 text-white`}
                  >
                    +{taskAssigns.length - 3}
                  </div>
                </div>
              )}
            </>
          </ul>

          {taskAssignModal && (
            <TaskAssign
              taskAssigns={taskAssigns}
              setTaskAssignModal={setTaskAssignModal}
            />
          )}

          {/* Priority Flag */}
          <DashedBorderCard classes="border-FB0606">
            <FiFlag color="#FB0606" size="20" />
          </DashedBorderCard>
        </div>
        {/* Share */}
        <div>
          <div
            className="flex items-center justify-center gap-1 "
            role="button"
          >
            <HiOutlineShare size="24" color="#BDBDBD" />
            <span className="text-base font-dana font-medium text-1E1E1E dark:text-[#F7F9F9]">
              اشتراک گذاری
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoHeaderRight;
