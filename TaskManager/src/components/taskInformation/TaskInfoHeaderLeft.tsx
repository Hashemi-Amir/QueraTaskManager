import { GoPlay } from "react-icons/go";
import Watchers from "../ui/Watchers";
import CloseIcon from "../ui/Close";
import getPersianDate from "./getPersianDate";

type TaskInfoHeaderLeftProps = {
  handleCloseTaskInfo: () => void;
  deadline: string;
};

const TaskInfoHeaderLeft = ({
  handleCloseTaskInfo,
  deadline,
}: TaskInfoHeaderLeftProps) => {
  return (
    <div className="w-1/2  h-full relative">
      <div className="w-full h-14 px-4  absolute bottom-6 flex justify-between items-center">
        {/* Task Info Left */}
        <div className="flex h-full items-center divide-x divide-F4F4F4 divide-x-reverse">
          {/* Creation Date */}
          <div className="h-full pl-8">
            <span className="text-BBBBBB text-xs font-medium">
              ساخته شده در
            </span>
            <p className="text-1E1E1E text-base font-medium">1 اردیبهشت 1402</p>
          </div>
          {/* Timer*/}
          <div className="h-full px-8">
            <span className="text-BBBBBB text-xs font-medium">زمان</span>
            <div className="text-1E1E1E text-base font-medium flex  gap-1">
              <button className="mb-1">
                <GoPlay size={18} fill="green" />
              </button>
              <span className="">00:00:00</span>
            </div>
          </div>
          {/* Deadline */}
          <div className="h-full pr-7 ml-auto">
            <span className="text-BBBBBB text-xs font-medium">ددلاین</span>
            <div className="text-1E1E1E text-base font-medium">
              {deadline ? getPersianDate(deadline) : "تعریف نشده"}
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
    </div>
  );
};

export default TaskInfoHeaderLeft;
