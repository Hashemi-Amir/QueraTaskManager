import { FiFlag } from "react-icons/fi";
import Button from "../../ui/Button";
import { useState } from "react";
import PriorityOptions from "../Small/PriorityOptions";

type AddTaskOnCalendar = {
  handleNewTask: () => void;
  clickDate: string;
};
const AddTaskOnCalendar = ({ handleNewTask, clickDate }: AddTaskOnCalendar) => {
  const [priority, setPriority] = useState({
    modal: false,
    style: "text-C1C1C1 border-C1C1C1",
    status: "",
  });

  const handlePriority = (e: any) => {
    const style = e.target.getAttribute("data-style");
    const status = e.target.innerText != "حذف اولویت" ? e.target.innerText : "";
    setPriority({ ...priority, style: style, modal: false, status: status });
  };

  const centering = "w-full flex items-center";
  return (
    <div className="modal-box w-2/3 max-w-1xl py-5 px-12 overflow-visible ">
      {/* header */}
      <div className={centering}>
        <label
          htmlFor="my-modal-3"
          className="cursor-pointer"
          onClick={handleNewTask}
        >
          ✕
        </label>
        <input
          type="text"
          id="taskTitle"
          name="taskTitle"
          placeholder="نام تسک را وارد کنید"
          className="mr-3 text-2xl text-black font-medium focus:outline-none"
        />
      </div>

      {/* content */}
      <div className={`${centering} relative justify-between mt-10`}>
        <div className="flex text-D3D3D3 text-2xl">
          <span
            className={`${priority.style} cursor-pointer border-none`}
            onClick={() => setPriority({ ...priority, modal: true })}
          >
            <FiFlag />
          </span>
          <span className="mr-5 text-208D8E text-xl font-medium">
            {clickDate}
          </span>

          {priority.modal && (
            <PriorityOptions
              handlePriority={handlePriority}
              className="top-7"
            />
          )}
        </div>

        <div className="w-32">
          <Button value="ساختن تسک" />
        </div>
      </div>
    </div>
  );
};

export default AddTaskOnCalendar;
