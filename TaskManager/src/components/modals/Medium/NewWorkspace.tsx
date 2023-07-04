import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { Dispatch, SetStateAction, useState } from "react";
import CheckBoxColor from "../../ui/CheckBoxColor";
import { BiBlock } from "react-icons/bi";
import { AiOutlineArrowLeft, AiOutlineLoading3Quarters } from "react-icons/ai";
import CloseIcon from "../../ui/Close";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { toast } from "react-toastify";
import {
  createWorkSpace,
  toggleMediumModal,
} from "../../../services/app/store";

type workspaceProps = {
  workSpaceStep: string;
  setWorkSpaceStepe: Dispatch<SetStateAction<string>>;
};

const NewWorkspace = ({ workSpaceStep, setWorkSpaceStepe }: workspaceProps) => {
  const [selectedColor, setSelectedColor] = useState({
    color: "bg-[#7D828C]",
    id: 0,
  });
  const [workspaceName, setWorkSpaceName] = useState("");
  const fontList = "text-sm font-semibold text-black dark:text-inherit";
  const liStyle = "w-full flex justify-between items-center";
  const dataColor = [
    { id: 1, color: "bg-[#84C6A1]" },
    { id: 2, color: "bg-[#78C6B0]" },
    { id: 3, color: "bg-[#76BC86]" },
    { id: 4, color: "bg-[#80DC69]" },
    { id: 5, color: "bg-[#E46161]" },
    { id: 6, color: "bg-[#E17E80]" },
    { id: 7, color: "bg-[#EC8182]" },
    { id: 8, color: "bg-[#F3C567]" },
    { id: 9, color: "bg-[#B9995E]" },
    { id: 10, color: "bg-[#E57A57]" },
    { id: 11, color: "bg-[#F1A25C]" },
    { id: 12, color: "bg-[#E28A60]" },
    { id: 13, color: "bg-[#6897C2]" },
    { id: 14, color: "bg-[#74AADD]" },
    { id: 15, color: "bg-[#3C45E7]" },
    { id: 16, color: "bg-[#6DAFCE]" },
    { id: 17, color: "bg-[#6CB2F7]" },
    { id: 18, color: "bg-[#9286EA]" },
    { id: 19, color: "bg-[#C074D1]" },
    { id: 20, color: "bg-[#486774]" },
    { id: 21, color: "bg-[#46494D]" },
  ];

  const dispatch = useAppDispatch();
  const { isLoadingPost } = useAppSelector((state) => state.workSpaces);
  const user = useAppSelector((state) => state.auth.user);
  const username = user?.username.substring(0, 2);
  const handleCheckBoxColor = (data: { color: 'string'; id: number }) => {
    setSelectedColor({ ...selectedColor, color: data.color, id: data.id });
  };

  const handleWorkSpaceStep = () => {
    const nameInput =
      document.querySelector<HTMLInputElement>("#newWork")?.value;
    if (workSpaceStep === "ساختن ورک اسپیس جدید" && nameInput?.trim()) {
      setWorkSpaceName(nameInput);
      setWorkSpaceStepe("انتخاب رنگ ورک اسپیس");
    } else if (workSpaceStep === "انتخاب رنگ ورک اسپیس") {
      setWorkSpaceStepe("مرور اطلاعات");
    } else if (workSpaceStep === "مرور اطلاعات") {
      dispatch(createWorkSpace(workspaceName));
      setWorkSpaceStepe("ساختن ورک اسپیس جدید");
    } else {
      toast.warning("نام ورک اسپیس را وارد کنید", { rtl: true });
    }
  };

  return (
    <div className="modal-box z-50 w-3/4 max-w-lgl min-w-[500px] dark:bg-[#15202B]">
      <div className="p-5 rounded-lg">
        {/* card header */}
        <div className="w-full flex justify-between items-center">
          <label
            htmlFor="my-modal-3"
            className="text-323232 cursor-pointer"
            onClick={() => dispatch(toggleMediumModal(""))}
          >
            <CloseIcon />
          </label>

          <div className="font-semibold text-2xl text-black dark:text-[#F7F9F9]">
            {workSpaceStep}
          </div>
          {/* back page */}
          {workSpaceStep === "انتخاب رنگ ورک اسپیس" ||
          workSpaceStep === "مرور اطلاعات" ? (
            <div
              className="cursor-pointer dark:text-[#F7F9F9]"
              onClick={() => {
                workSpaceStep === "انتخاب رنگ ورک اسپیس"
                  ? setWorkSpaceStepe("ساختن ورک اسپیس جدید")
                  : setWorkSpaceStepe("انتخاب رنگ ورک اسپیس");
              }}
            >
              <AiOutlineArrowLeft />
            </div>
          ) : (
            <span></span>
          )}
        </div>

        {/* card content */}
        {isLoadingPost ? (
          <AiOutlineLoading3Quarters
            size="2.8rem"
            color="208D8E"
            className="m-auto mt-3 animate-spin"
          />
        ) : (
          <div className="mt-11 w-full dark:text-[#F7F9F9]">
            {workSpaceStep === "ساختن ورک اسپیس جدید" ? (
              <Input
                label="نام ورک اسپیس"
                type="text"
                id="newWork"
              />
            ) : workSpaceStep === "انتخاب رنگ ورک اسپیس" ? (
              <>
                {/* select color */}
                <div className="w-full flex">
                  {/* avatar */}
                  <div
                    className={`w-24 h-16 rounded-lg text-2xl font-semibold text-white flex justify-center items-center ${selectedColor.color}`}
                  >
                    {username}
                  </div>

                  {/* list of colors */}
                  <div className="mr-9 flex flex-col dark:text-[#F7F9F9]">
                    <span className="text-sm text-black dark:text-inherit">
                      رنگ ورک اسپیس
                    </span>
                    <ul className="mt-5  h-10 flex justify-start content-between flex-wrap">
                      <li
                        className="h-4 w-4 mr-3 rounded-sm hover:cursor-pointer text-black dark:text-inherit"
                        onClick={() => {
                          setSelectedColor({
                            ...selectedColor,
                            color: "bg-[#7D828C]",
                            id: 0,
                          });
                        }}
                      >
                        <BiBlock />
                      </li>
                      {dataColor.map((li) => (
                        <CheckBoxColor
                          key={li.id}
                          data={li}
                          selectedColor={selectedColor}
                          handleCheckBoxColor={handleCheckBoxColor}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Browsing info */}
                <ul className="w-full px-3 py-6 flex flex-col border rounded-lg dark:text-[#F7F9F9]">
                  {/* workspace name */}
                  <li className={liStyle}>
                    <span className={fontList}>نام ورک اسپیس</span>
                    <span className={fontList}>{workspaceName}</span>
                  </li>

                  {/* workspace color*/}

                  <li className={`mt-6 ${liStyle}`}>
                    <span className={fontList}>رنگ ورک اسپیس</span>
                    <span className={fontList}>
                      <div
                        className={`h-4 w-4 mr-3 rounded-sm ${selectedColor.color}`}
                      ></div>
                    </span>
                  </li>
                  {/* workspace members */}

                  <li className={`mt-6 ${liStyle}`}>
                    <span className={fontList}>اعضا</span>
                    <span className="w-9 h-9 rounded-full">
                      <div className="w-9 h-9 flex justify-center items-center bg-F27474 text-white rounded-full">
                        {username}
                      </div>
                    </span>
                  </li>
                </ul>
              </>
            )}

            {/* Button  */}
            <div className="mt-16">
              <Button
                value={
                  workSpaceStep === "مرور اطلاعات" ? "ساختن ورک اسپیس" : "ادامه"
                }
                onClick={handleWorkSpaceStep}
                disabled={isLoadingPost}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewWorkspace;
