import { useState } from "react";
import { FiLink, FiFlag, FiUserPlus, FiEye } from "react-icons/fi";
import { BsCalendar3, BsTags } from "react-icons/bs";
import Button from "../../ui/Button";
import { createPortal } from "react-dom";
import Tags from "../Small/Tags";
import PriorityOptions from "../Small/PriorityOptions";
import QuckCalendar from "./QuckCalendar";
import CloseIcon from "../../ui/Close";

type typePriority = {
  modal: boolean;
  style: string | null;
  status: string;
};

type addNewTaskProps = {
  handleNewTaskModal: (modalName :string) => void;
};

const AddNewTask = ({ handleNewTaskModal }: addNewTaskProps) => {
  const [calendar, setCalendar] = useState(false);
  const [tags, setTags] = useState(false);
  const [priority, setPriority] = useState<typePriority>({
    modal: false,
    style: "text-C1C1C1 border-C1C1C1",
    status: "",
  });

  const handlePriority = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const element = e.target as HTMLElement;
    const style = element.getAttribute("data-style");

    const status = element.innerText != "حذف اولویت" ? element.innerText : "";
    setPriority({ ...priority, style: style, modal: false, status });
  };

  const handleCalendar = () => {
    setCalendar(false);
  };

  const handleTagsModal = () => {
    setTags(!tags);
  };

  const listOfIcons = `w-12 h-12 text-xl rounded-full text-C1C1C1 border-C1C1C1 border-2 border-dashed flex justify-center items-center cursor-pointer`;

  return (
    <div className="modal-box overflow-visible opacity-100 z-30 py-9 px-11 rounded-2xl shadow-xl w-11/12 max-w-5xl">
      <form className="flex flex-col">
        {/* task header */}
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <div className={`h-4 w-4 mr-3 rounded-sm bg-D3D3D3`}></div>
            <input
              type="text"
              id="taskTitle"
              name="taskTitle"
              placeholder="نام تسک را وارد کنید"
              className="mr-3 text-2xl text-black font-medium focus:outline-none"
            />
          </div>

          <span
            className="cursor-pointer text-[#BDBDBD]"
            onClick={() => handleNewTaskModal('')}
          >
            <CloseIcon />
          </span>
        </div>

        {/* task subHeader */}
        <div className="mt-10 flex items-center text-base text-black font-medium">
          در
          <input
            type="text"
            name="forMember"
            id="forMember"
            placeholder="پروژه اول"
            className="w-40 mx-2 text-base font-normal border px-2 py-1 rounded-md  focus:outline-none"
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
            className=" w-full h-full border text-base font-normal rounded-xl p-5 resize-none focus:outline-none"
          ></textarea>
        </div>

        <div className="w-full mt-11 flex items-center">
          <div className="font-normal text-base">افزودن پیوست</div>
          <label
            htmlFor="addFileTask"
            className="w-28 border border-208D8E p-1 rounded-md flex justify-center items-center text-base font-normal mr-4 text-208D8E"
          >
            <FiLink />
            <span className="text-black mr-1">آپلود فایل</span>
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
            <li
              className={` w-12 h-12 text-xl rounded-full border-2 border-dashed flex justify-center items-center cursor-pointer ${priority.style}`}
              onClick={() => setPriority({ ...priority, modal: true })}
            >
              <span>
                <FiFlag />
              </span>
            </li>
            {priority.modal && (
              <PriorityOptions handlePriority={handlePriority} />
            )}

            {/* calendar */}
            <li className={listOfIcons} onClick={() => setCalendar(true)}>
              <BsCalendar3 />
            </li>

            <li className={listOfIcons}>
              <BsTags onClick={handleTagsModal} />
              <div className="relative">
                {tags && <Tags handleTagsModal={handleTagsModal} />}
              </div>
            </li>

            <li
              className={`w-12 h-12 text-[#C1C1C1] -z-10 rounded-full border-2 flex justify-center items-center cursor-pointer border-none relative text-6xl`}
            >
              <FiEye />
              <span className="h-6 w-6 rounded-full -top-2 right-0 flex justify-center items-center absolute text-sm bg-4AB7D8 text-black">
                ۲
              </span>
            </li>
          </ul>

          {/* create task button */}

          <div className="w-32 h-8">
            <Button value="ساخت تسک" />
          </div>
        </div>
      </form>

      {/* modals on modals */}
      {calendar &&
        createPortal(
          <QuckCalendar handleCalendar={handleCalendar} />,
          document.body
        )}
    </div>
  );
};

export default AddNewTask;
