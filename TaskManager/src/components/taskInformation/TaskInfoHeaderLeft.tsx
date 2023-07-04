import { GoPlay } from "react-icons/go";
import Watchers from "../ui/Watchers";
import CloseIcon from "../ui/Close";
import { BsCalendar3 } from "react-icons/bs";
import { createPortal } from "react-dom";
import QuckCalendar from "../modals/Large/QuickCalendar";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { fetchUpdateTask } from "../../services/app/store";
import { getPersianDateWithOutTime } from "./getPersianDate";
import getGregorianDate from "./getGregorianDate";

type TaskInfoHeaderLeftProps = {
  handleCloseTaskInfo: () => void;
  deadline: string | undefined;
  description: string;
  name: string;
};

const TaskInfoHeaderLeft = ({
  handleCloseTaskInfo,
  deadline,
  description,
  name,
}: TaskInfoHeaderLeftProps) => {
  const [calendar, setCalendar] = useState({
    modal: false,
    value: "",
  });
  const handleCalendar = (modalState: boolean) => {
    setCalendar({ ...calendar, modal: modalState });
  };

  const dispatch = useAppDispatch();
  const { selectedTaskId } = useAppSelector((state) => state.boards);

  const submitChangesHandler = (deadline: string) => {
    dispatch(
      fetchUpdateTask({
        description,
        name,
        deadline,
        taskId: selectedTaskId,
      })
    );
  };

  return (
    <div className="w-1/2  h-full relative dark:text-inherit">
      <div className="w-full h-14 px-4  absolute bottom-6 flex justify-between items-center">
        {/* Task Info Left */}
        <div className="flex h-full items-center divide-x divide-F4F4F4 dark:divide-[#57585f] divide-x-reverse">
          {/* Creation Date */}
          <div className="h-full pl-8 ">
            <span className="text-BBBBBB text-xs font-medium">
              ساخته شده در
            </span>
            <p className="text-1E1E1E text-base font-medium dark:text-inherit">
              1 اردیبهشت 1402
            </p>
          </div>
          {/* Timer*/}
          <div className="h-full px-8">
            <span className="text-BBBBBB text-xs font-medium ">زمان</span>
            <div className="text-1E1E1E text-base font-medium flex  gap-1  dark:text-inherit">
              <button className="mb-1">
                <GoPlay size={18} className="dark:text-[#F1B127] text-208D8E" />
              </button>
              <span className="">00:00:00</span>
            </div>
          </div>
          {/* Deadline */}
          <div
            onClick={() => handleCalendar(true)}
            className="h-full pr-7 ml-auto cursor-pointer"
          >
            <div className="flex gap-2">
              <span className="text-BBBBBB text-xs font-medium">ددلاین</span>
              <BsCalendar3 className="mb-1  dark:text-inherit" />
            </div>
            <div className="text-1E1E1E text-base font-medium  dark:text-inherit">
              {deadline
                ? getPersianDateWithOutTime(getGregorianDate(deadline))
                : "تعریف نشده"}
            </div>
          </div>
        </div>
        {/* Watchers */}
        <div>
          <Watchers />
        </div>
      </div>

      {/* Closing window */}
      <span onClick={handleCloseTaskInfo}>
        <CloseIcon classes={"absolute left-3 top-2 text-BDBDBD"} />
      </span>
      {calendar.modal &&
        createPortal(
          <QuckCalendar
            submitChangesHandler={submitChangesHandler}
            handleCalendar={handleCalendar}
          />,
          document.body
        )}
    </div>
  );
};

export default TaskInfoHeaderLeft;
