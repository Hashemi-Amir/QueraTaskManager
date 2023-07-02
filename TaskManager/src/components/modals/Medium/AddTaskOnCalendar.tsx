import { FiFlag } from "react-icons/fi";
import Button from "../../ui/Button";
import CloseIcon from "../../ui/Close";
import { useAppDispatch } from "../../../services/app/hook";
import { toggleMediumModal } from "../../../services/app/store";

type AddTaskOnCalendar = {
  clickDate: string;
};
const AddTaskOnCalendar = ({ clickDate }: AddTaskOnCalendar) => {
  const centering = "w-full flex items-center";
  const dispatch = useAppDispatch();
  return (
    <div className="modal-box w-2/3 max-w-1xl min-w-[550px] py-5 px-12 overflow-visible dark:bg-[#15202B] ">
      {/* header */}
      <div className={centering}>
        <label
          htmlFor="my-modal-3"
          className="cursor-pointer text-black dark:text-[#F7F9F9]"
          onClick={() => dispatch(toggleMediumModal(""))}
        >
          <CloseIcon />
        </label>
        <input
          type="text"
          id="taskTitle"
          name="taskTitle"
          autoComplete="off"
          placeholder="نام تسک را وارد کنید"
          className="mr-3 text-2xl text-black font-medium focus:outline-none dark:bg-transparent dark:text-[#F7F9F9]"
        />
      </div>

      {/* content */}
      <div className={`${centering} relative justify-between mt-10`}>
        <div className="flex text-D3D3D3 text-2xl">
          <span className={`cursor-pointer border-none`}>
            <FiFlag />
          </span>
          <span className="mr-5 text-208D8E text-xl font-medium dark:text-[#F1B127]">
            {clickDate}
          </span>
        </div>

        <div className="w-32">
          <Button value="ساختن تسک" />
        </div>
      </div>
    </div>
  );
};

export default AddTaskOnCalendar;
