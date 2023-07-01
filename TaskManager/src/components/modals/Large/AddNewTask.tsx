import { useState } from "react";
import { FiLink, FiFlag, FiUserPlus, FiEye } from "react-icons/fi";
import { BsCalendar3, BsTags, BsThreeDots } from "react-icons/bs";
import Button from "../../ui/Button";
import { createPortal } from "react-dom";
// import PriorityOptions from "../Small/PriorityOptions";
import QuckCalendar from "./QuckCalendar";
import { toast } from "react-toastify";      
import CloseIcon from "../../ui/Close";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { toggleMediumModal } from "../../../services/app/store";

// type typePriority = {
//   modal: boolean;
//   style: string | null;
//   status: string;
// };

type addNewTaskProps = {
  handleAddNewTask?: ((data: (string | undefined)[]) => void) | undefined;
  boardList?: object[] | undefined;
};

const AddNewTask = ({
  handleAddNewTask,
}: addNewTaskProps) => {
  const [calendar, setCalendar] = useState({
    modal: false,
    value: "",
  });
  const [isValues , setIsValues] = useState(false)
  // const [priority, setPriority] = useState<typePriority>({
  //   modal: false,
  //   style: "text-C1C1C1 border-C1C1C1",
  //   status: "",
  // });
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.tasks);
  // const handlePriority = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   const element = e.target as HTMLElement;
  //   const style = element.getAttribute("data-style");

  //   const status = element.innerText != "حذف اولویت" ? element.innerText : "";
  //   setPriority({ ...priority, style: style, modal: false, status });
  // };

  const handleCalendar = (modalState: boolean, value?: string) => {
    setCalendar({ ...calendar, modal: modalState, value: value! });
  };

  const showTime = calendar.value ? calendar.value.substring(8,10) : ''

  const handleNewTaskButton = () => {
    const taskDisc =
      document.querySelector<HTMLTextAreaElement>("#descTask")?.value;
    const taskTitle =
      document.querySelector<HTMLInputElement>("#taskTitle")?.value;
    const data = [taskTitle, taskDisc, calendar.value];

    if ((taskDisc && taskTitle && calendar.value)?.trim()) {
      handleAddNewTask && handleAddNewTask(data);
    }else{
      setIsValues(true);
      toast.warning('جاهایی که لازمه پر کن',{rtl:true})
    }
  };

  const listOfIcons = `w-12 h-12 text-xl rounded-full text-C1C1C1 border-C1C1C1 border-2 border-dashed flex justify-center items-center cursor-pointer`;

  return (
    <>
      <div  className="modal-box overflow-visible opacity-100 z-30 py-9 px-11 rounded-2xl shadow-xl w-11/12 max-w-5xl min-w-[1000px]">
        <div>
          <div className="flex flex-col ">
            {/* task header */}
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col items-start ">
                <div className="flex items-center">
                <div className={`h-4 w-4 mr-3 rounded-sm ${isValues ? 'bg-FB0606' : 'bg-D3D3D3'} `}></div>
                <input
                  type="text"
                  id="taskTitle"
                  name="taskTitle"
                  placeholder="نام تسک را وارد کنید"
                  className="mr-3 text-2xl text-black font-medium focus:outline-none"
                  required
                />
                </div>

              {/* <p>error validation</p> */}

              </div>
              <span
                className="cursor-pointer text-[#BDBDBD]"
                onClick={() => dispatch(toggleMediumModal(''))}
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
                className={`w-full h-full  ${isValues ? 'border border-FB0606' : 'border'} text-base font-normal rounded-xl p-5 resize-none focus:outline-none`}
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
                  className={`${listOfIcons} `}
                  // onClick={() => setPriority({ ...priority, modal: true })}
                >
                  <span>
                    <FiFlag />
                  </span>
                </li>
                {/* ${priority.style} */}
                {/* {priority.modal && (
                  <PriorityOptions handlePriority={handlePriority} />
                )} */}

                {/* calendar */}
                <li
                  className={`${listOfIcons} ${showTime != '' && "!text-208D8E !border-208D8E"} ${isValues ? 'border-FB0606 text-FB0606':'border-C1C1C1'}`}
                  onClick={() => handleCalendar(true)}
                > 
                  {
                    calendar.value === '' ? 
                    (<BsCalendar3 />) :
                    (showTime)
                  }
                  
                </li>

                <li className={listOfIcons} >
                  <BsTags />
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
                {isLoading ? (
                  <button className="disabled:pointer-events-none  bg-208D8E hover:bg-[#1d7f80] focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all w-full h-10 p-2.5 text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md">
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
