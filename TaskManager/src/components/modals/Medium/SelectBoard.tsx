import { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import CloseIcon from "../../ui/Close";
import { useAppDispatch } from "../../../services/app/hook";
import { toggleMediumModal } from "../../../services/app/store";

type dataList = {
  _id: string;
  name: string;
};
type SelectBoardProps = {
  data: dataList[];
  selectedHandle: (id: string) => void;
  status: string;
};

const SelectBoard = ({ data, selectedHandle, status }: SelectBoardProps) => {
  const [boardId, setBoardId] = useState("");
  const selectRef = useRef<any | null>(null);

  const dispatch = useAppDispatch();
  const handleSelectValue = (event: React.ChangeEvent<HTMLElement>) => {
    const element = event.target as HTMLInputElement;
    setBoardId(element.value);
  };
  useEffect(() => {true}, [status]);

  return (
    <div className="modal-box w-[400px] dark:bg-[#15202B]">
      {data.length > 0 ? (
        <div className="p-5  rounded-lg">
          {/* card header */}
          <div className="w-full flex justify-between items-center">
            <label
              htmlFor="my-modal-3"
              className="text-323232 cursor-pointer dark:text-[#F7F9F9]"
              onClick={() => dispatch(toggleMediumModal(""))}
            >
              <CloseIcon />
            </label>

            <div className="font-semibold text-2xl text-black dark:text-[#F7F9F9]">
              انتخاب {status}
            </div>

            <span></span>
          </div>
          {/* card content */}

          <div className="mt-11 w-full ">
            {/* selectedList */}
            <div className="flex items-center justify-center">
              <select
                dir="rtl"
                onChange={handleSelectValue}
                className="select select-accent w-full text-center dark:bg-[#1E2124] dark:border-[#F1B127] dark:text-[#F7F9F9] dark:focus:outline-none"
                id="sel"
                defaultValue={boardId}
                ref={selectRef}
              >
                <option disabled value={boardId}>
                  {status} مورد نظر را انتخاب کنید
                </option>
                {data &&
                  data.map((item) => {
                    return (
                      <option key={item._id} value={item._id} >
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* button */}
            <div className="mt-16">
              <Button
                value={"ادامه"}
                onClick={() => {
                  const selectedValue = selectRef.current?.value;
                  selectedValue && selectedHandle(selectedValue);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex  justify-between items-center dark:bg-[#15202B]">
            <label
              htmlFor="my-modal-3"
              className="text-323232 cursor-pointer dark:text-[#F7F9F9]"
              onClick={() => dispatch(toggleMediumModal(""))}
            >
              <CloseIcon />
            </label>

            <div className="font-semibold text-2xl text-black"></div>

            <span></span>
          </div>
          <div className="font-semibold text-xl text-black text-center dark:text-[#F7F9F9]">
            {status === "پروژه"
              ? `${status} ای وجود نداره ، یدونه بساز`
              : `${status}ی وجود نداره ، یدونه بساز`}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectBoard;
