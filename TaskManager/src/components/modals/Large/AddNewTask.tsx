import { useState } from "react";
import { FiLink, FiFlag, FiUserPlus, FiEye } from "react-icons/fi";
import { BsCalendar3, BsTags, BsThreeDots } from "react-icons/bs";
import Button from "../../ui/Button";
import { createPortal } from "react-dom";
import QuckCalendar from "./QuickCalendar";
import { toast } from "react-toastify";
import CloseIcon from "../../ui/Close";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { toggleMediumModal } from "../../../services/app/store";

type addNewTaskProps = {
  handleAddNewTask?: ((data: (string | undefined)[]) => void) | undefined;
  boardList?: object[] | undefined;
};

const AddNewTask = ({ handleAddNewTask }: addNewTaskProps) => {
  const [calendar, setCalendar] = useState({
    modal: false,
    value: "",
  });

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.tasks);

  const handleCalendar = (modalState: boolean, value?: string) => {
    setCalendar({ ...calendar, modal: modalState, value: value ?? "" });
  };

  const showTime = calendar.value ? calendar.value.substring(8, 10) : "";

  const handleNewTaskButton = () => {
    const taskDisc = document.querySelector<HTMLTextAreaElement>("#descTask");
    const taskTitle = document.querySelector<HTMLInputElement>("#taskTitle");
    const calendarEl = document.querySelector<HTMLInputElement>("#calendar");
    // const data = [taskTitle, taskDisc, calendar.value];

    if (!taskTitle?.value.trim()) {
      taskTitle?.classList.add("border-b");
      taskTitle?.classList.add("border-red-500");
    } else {
      taskTitle?.classList.remove("border-b");
      taskTitle?.classList.remove("border-red-500");
    }

    if (!taskDisc?.value.trim()) {
      taskDisc?.classList.add("border-b");
      taskDisc?.classList.add("border-red-500");
    } else {
      taskDisc?.classList.remove("border-b");
      taskDisc?.classList.remove("border-red-500");
    }

    if (!calendar.value) {
      calendarEl?.classList.add("border-b");
      calendarEl?.classList.add("text-red-500");
      calendarEl?.classList.add("border-red-500");
    } else {
      calendarEl?.classList.remove("border-b");
      calendarEl?.classList.remove("text-red-500");
      calendarEl?.classList.remove("border-red-500");
    }

    if ((taskDisc?.value && taskTitle?.value && calendar.value)?.trim()) {
      const sanitizedValues = [
        taskTitle?.value,
        taskDisc?.value,
        calendar.value,
      ].map((value) => (value ? value : undefined));
      handleAddNewTask && handleAddNewTask(sanitizedValues);
    } else {
      toast.warning("بخش‌های لازم را وارد کنید", { rtl: true });
    }
  };

  const listOfIcons = `w-12 h-12 text-xl rounded-full text-C1C1C1 border-C1C1C1 border-2 border-dashed flex justify-center items-center cursor-pointer`;

  return (
    <>
      <div className="modal-box overflow-visible opacity-100 z-30 py-9 px-11 rounded-2xl shadow-xl w-11/12 max-w-5xl min-w-[1000px] dark:bg-[#15202B]">
        <div>
          <div className="flex flex-col ">
            {/* task header */}
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col items-start ">
                <div className="flex items-center">
                  <div
                    className={`h-4 w-4 mr-3 rounded-sm bg-D3D3D3 dark:bg-[#F1B127] `}
                  ></div>
                  <input
                    type="text"
                    id="taskTitle"
                    name="taskTitle"
                    autoComplete="off"
                    placeholder="نام تسک را وارد کنید"
                    className="mr-3 text-2xl text-black font-medium focus:outline-none dark:bg-transparent dark:text-[#F7F9F9]"
                    required
                  />
                </div>
              </div>
              <span
                className="cursor-pointer text-[#BDBDBD] dark:text-[#F7F9F9]"
                onClick={() => dispatch(toggleMediumModal(""))}
              >
                <CloseIcon />
              </span>
            </div>

            {/* task subHeader */}
            <div className="mt-10 flex items-center text-base text-black font-medium dark:text-[#F7F9F9]">
              در
              <input
                type="text"
                name="forMember"
                id="forMember"
                placeholder="پروژه اول"
                className="w-40 mx-2 text-base font-normal border px-2 py-1 rounded-md  focus:outline-none dark:bg-transparent"
              />
              برای
              <span className="w-9 h-9 mr-3 p-1 text-D3D3D3 rounded-full border-2 border-dashed flex justify-center items-center">
                <FiUserPlus />
              </span>
            </div>

            {/* task inputs */}
            <div className="w-full h-48 mt-10">
              <textarea
                name="descTask"
                id="descTask"
                placeholder="توضیحاتی برای تسک بنویسید"
                className={`w-full h-full   text-base font-normal border rounded-xl p-5 resize-none focus:outline-none dark:bg-[#1E2124] dark:text-[#F7F9F9] `}
              ></textarea>
            </div>

            <div className="w-full mt-11 flex items-center">
              <div className="font-normal text-base dark:text-[#F7F9F9]">
                افزودن پیوست
              </div>
              <label
                htmlFor="addFileTask"
                className="w-28 border border-208D8E p-1 rounded-md flex justify-center items-center text-base font-normal mr-4 text-208D8E dark:border-[#F1B127] dark:text-[#F1B127]"
              >
                <FiLink />
                <span className="text-black mr-1 dark:text-[#F7F9F9]">
                  آپلود فایل
                </span>
              </label>

              <input
                type="file"
                name="addFileTask"
                id="addFileTask"
                className="hidden"
              />
            </div>

            {/* task footer */}
            <div className="w-full mt-11 flex justify-between items-center">
              {/* list of icons */}
              <ul className="w-72 relative flex items-center justify-between">
                {/* priority */}
                <li className={`${listOfIcons} `}>
                  <span>
                    <FiFlag />
                  </span>
                </li>
                <li
                  id="calendar"
                  className={`${listOfIcons} ${
                    showTime != "" &&
                    "!text-208D8E !border-208D8E dark:!text-[#F1B127] dark:!border-[#F1B127]"
                  }  `}
                  onClick={() => handleCalendar(true)}
                >
                  {calendar.value === "" ? <BsCalendar3 /> : showTime}
                </li>

                <li className={listOfIcons}>
                  <BsTags />
                </li>

                <li
                  className={`w-12 h-12 text-[#C1C1C1] -z-10 rounded-full border-2 flex justify-center items-center cursor-pointer border-none relative text-6xl`}
                >
                  <FiEye />
                  <span className="h-6 w-6 rounded-full -top-2 right-0 flex justify-center items-center absolute text-sm bg-4AB7D8 text-black dark:bg-[#F1B127]">
                    ۲
                  </span>
                </li>
              </ul>

              {/* create task button */}

              <div className="w-32 h-8">
                {isLoading ? (
                  <button className="disabled:pointer-events-none  bg-208D8E hover:bg-[#1d7f80] focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all w-full h-10 p-2.5 text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md dark:bg-[#F1B127] dark:text-[#0F111A]">
                    <BsThreeDots className="animate-ping" />
                  </button>
                ) : (
                  <Button value="ساخت تسک" onClick={handleNewTaskButton} />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* modals on modals */}
        {calendar.modal &&
          createPortal(
            <QuckCalendar handleCalendar={handleCalendar} />,
            document.body
          )}
      </div>
    </>
  );
};

export default AddNewTask;
