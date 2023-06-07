import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { Dispatch, SetStateAction, useState } from "react";
import CheckBoxColor from "../../ui/CheckBoxColor";
import { BiBlock } from "react-icons/bi";
import avatar from "../../../assets/avatar.png";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CloseIcon from "../../ui/Close";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { createWorkSpace } from "../../../services/features/workSpaceList/workSpaceSlice";
import { RootState } from "../../../services/app/store";

type workspaceProps = {
  workSpaceStep: string;
  setWorkSpaceStepe: Dispatch<SetStateAction<string>>;
  handleModalWorkSpace: () => void;
};

const NewWorkspace = ({
  workSpaceStep,
  setWorkSpaceStepe,
  handleModalWorkSpace,
}: workspaceProps) => {
  const [selectedColor, setSelectedColor] = useState({
    color: "bg-[#7D828C]",
    id: 0,
  });
  const [workspaceName, setWorkSpaceName] = useState("");
  const fontList = "text-sm font-semibold text-black";
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

  const handleCheckBoxColor = (data: any): any => {
    setSelectedColor({ ...selectedColor, color: data.color, id: data.id });
  };

  const handleWorkSpaceStep = () => {
    const regex = /\S/g;
    if (workSpaceStep === "ساختن ورک اسپیس جدید" && regex.test(workspaceName)) {
      setWorkSpaceName(workspaceName);
      setWorkSpaceStepe("انتخاب رنگ ورک اسپیس");
    } else if (workSpaceStep === "انتخاب رنگ ورک اسپیس") {
      setWorkSpaceStepe("مرور اطلاعات");
    } else if (workSpaceStep === "مرور اطلاعات") {
      dispatch(createWorkSpace(workspaceName));
    }
  };
  return (
    <div className="modal-box w-3/4 max-w-lgl">
      <div className="p-5 bg-white rounded-lg">
        {/* card header */}
        <div className="w-full flex justify-between items-center">
          <label
            htmlFor="my-modal-3"
            className="text-323232 cursor-pointer"
            onClick={handleModalWorkSpace}
          >
            <CloseIcon />
          </label>

          <div className="font-semibold text-2xl text-black">
            {workSpaceStep}
          </div>
          {/* back page */}
          {workSpaceStep === "انتخاب رنگ ورک اسپیس" ||
          workSpaceStep === "مرور اطلاعات" ? (
            <div
              className="cursor-pointer"
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
        <div className="mt-11 w-full">
          {workSpaceStep === "ساختن ورک اسپیس جدید" ? (
            <Input
              label="نام ورک اسپیس"
              type="text"
              id="newWork"
              onChange={(e) => setWorkSpaceName(e.target.value)}
            />
          ) : workSpaceStep === "انتخاب رنگ ورک اسپیس" ? (
            <>
              {/* select color */}
              <div className="w-full flex">
                {/* avatar */}
                <div
                  className={`w-24 h-16 rounded-lg text-2xl font-semibold text-white flex justify-center items-center ${selectedColor.color}`}
                >
                  ت ط
                </div>

                {/* list of colors */}
                <div className="mr-9 flex flex-col">
                  <span className="text-sm text-black">رنگ ورک اسپیس</span>
                  <ul className="mt-5  h-10 flex justify-start content-between flex-wrap">
                    <li
                      className="h-4 w-4 mr-3 rounded-sm hover:cursor-pointer text-black"
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
              <ul className="w-full px-3 py-6 flex flex-col border rounded-lg ">
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
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWorkspace;
