import Button from "../ui/Button";
import CloseIcon from "../ui/Close";
import { taskAssignsType } from "../dashboard/dashboardColumnView/TaskCard";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { LegacyRef, useEffect, useRef, useState } from "react";
import {
  fetchAssignTask,
  fetchUnAssignTask,
  resetTask,
} from "../../services/app/store";
import { AiOutlineUserDelete } from "react-icons/ai";
import { toast } from "react-toastify";

type TaskAssignType = {
  setTaskAssignModal: (arg: boolean) => void;
  taskAssigns: taskAssignsType[];
};

const TaskAssign = ({ setTaskAssignModal, taskAssigns }: TaskAssignType) => {
  const inputRef: LegacyRef<HTMLInputElement> = useRef(null);
  const colors = JSON.parse(localStorage.getItem("Colors") as string);
  const [confirmationModaIsOpen, setConfirmationModaIsOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState("");

  // const { user: owner } = useAppSelector((state) => state.auth);
  const { selectedTaskId } = useAppSelector((state) => state.boards);
  const {
    taskAssignisError,
    taskAssignisLoading,
    taskAssignisSuccess,
    taskAssignmessage,
  } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (taskAssignisSuccess) {
      toast.success(taskAssignmessage, { rtl: true });
      dispatch(resetTask());
    }
    if (taskAssignisError) {
      toast.error(
        `${
          taskAssignmessage === "User not found"
            ? "کاربر مورد نظر پیدا نشد"
            : taskAssignmessage === "Task already assigned to this user"
            ? "تسک از قبل به کاربر مورد نظر اختصاص داده شده است"
            : taskAssignmessage
        }`,
        { rtl: true }
      );
      dispatch(resetTask());
    }
  }, [
    taskAssignisError,
    taskAssignisLoading,
    taskAssignisSuccess,
    taskAssignmessage,
    dispatch,
  ]);

  const handleAddMember = () => {
    if (inputRef.current && inputRef.current.value) {
      dispatch(
        fetchAssignTask({
          taskId: selectedTaskId,
          usernameOrId: inputRef.current.value.toLocaleLowerCase(),
        })
      );
      inputRef.current.value = "";
    }
  };
  const handleDeleteMember = (usernameOrId: string) => {
    dispatch(
      fetchUnAssignTask({
        taskId: selectedTaskId,
        usernameOrId,
      })
    );
    setDeletingUserId("");
  };

  return (
    <div className="absolute w-screen h-screen -top-[150px] right-56  z-50  ">
      <div className="modal-box max-h-[400px] overflow-hidden z-50 absolute dark:bg-[#131d27]  top-28 right-[5%] max-w-[350px] ">
        {/* modal content */}
        <div className="p-3 bg-white dark:bg-[#131d27] rounded-lg">
          {/* card header */}
          <div className="w-full flex justify-between items-center">
            <label
              htmlFor="my-modal-3"
              className="text-323232 cursor-pointer"
              onClick={() => setTaskAssignModal(false)}
            >
              <CloseIcon classes="dark:text-[#f7f7f9]" />
            </label>

            <div className="font-semibold text-2xl text-black  dark:text-inherit">
              اختصاص تسک
            </div>

            <span></span>
          </div>

          {/* card content */}
          <div className="mt-11 w-full ">
            <div className="w-full flex flex-col relative">
              {/* Send invite Link  */}
              <div className="flex">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="دعوت با نام کاربری"
                  name="invite"
                  className="w-4/5 h-10 p-3 bg-F0F1F3 rounded-tr-lg rounded-br-lg text-sm font-normal focus:outline-none dark:bg-[#1E2124] dark:text-inherit"
                />

                <div className="w-24 relative">
                  <Button
                    disabled={taskAssignisLoading}
                    value={`${taskAssignisLoading ? "" : "ارسال"}`}
                    className="rounded-tr-none rounded-br-none focus:outline-none"
                    onClick={handleAddMember}
                  />
                  {taskAssignisLoading && (
                    <span className=" loading loading-dots loading-lg absolute left-[29%] bottom-0 text-white"></span>
                  )}
                </div>
              </div>

              {/* List of Members */}
              <div
                className={`mt-7 flex flex-col max-h-48 mb-4 ${
                  taskAssigns.length > 0 &&
                  "overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-white dark:scrollbar-track-[#131d27] dark:scrollbar-thumb-[#3f4148]"
                } `}
              >
                <h4 className="text-sm font-normal text-[#7D828C]">
                  اشتراک گذاشته شده با
                </h4>
                <ul className="pl-4">
                  {taskAssigns &&
                    taskAssigns.map((user, index) => (
                      <li key={user._id} className="w-full mt-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`w-9 h-9 flex justify-center items-center ${colors[index]} rounded-full text-white`}
                            >
                              {user.username.substring(0, 2)}
                            </div>
                            <span className="w-28 mr-2 px-2 py-1 rounded-md flex items-center justify-center font-normal text-sm">
                              {user.username}
                            </span>
                          </div>
                          <AiOutlineUserDelete
                            size={20}
                            className="cursor-pointer hover:scale-125 hover:text-red-400 transition-all"
                            onClick={() => {
                              setDeletingUserId(user._id);
                              setConfirmationModaIsOpen(true);
                            }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
                {confirmationModaIsOpen && (
                  <div className="alert alert-warning absolute top-[100px] right-[0%]  z-50 w-full h-fit bg-red-300 dark:text-[#f7f7f9] dark:bg-[#1e2124]">
                    <span className="text-xs">
                      آیا از حذف کاربر مطمئن هستید؟
                    </span>
                    <div className="text-xsm">
                      <button
                        onClick={() => setConfirmationModaIsOpen(false)}
                        className="btn btn-xs bg-[#ff3333]  border-none hover:bg-[#ff1a1a]"
                      >
                        خیر
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteMember(deletingUserId);
                          setConfirmationModaIsOpen(false);
                        }}
                        className="btn btn-xs bg-208D8E hover:bg-[#1d7f80] focus:outline-none text-white dark:bg-[#F1B127] dark:text-[#0F111A] dark:focus:ring-[#f9e0a9] border-none dark:hover:bg-[#d99f23]"
                      >
                        بله
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssign;
