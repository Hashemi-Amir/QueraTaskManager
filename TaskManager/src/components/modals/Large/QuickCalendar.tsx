import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { BsCalendar4 } from "react-icons/bs";
import "./customCalendar.css";
import { useAppSelector } from "../../../services/app/hook";

type QuickCalendarProps = {
  handleCalendar: (modalState: boolean, value?: any) => void;
  submitChangesHandler?: (deadline: string) => void;
};

const QuickCalendar = ({
  handleCalendar,
  submitChangesHandler,
}: QuickCalendarProps) => {
  const [value, setValue] = useState(null);
  const [deadline, setDeadline] = useState({
    showDeadline: "",
    value: "",
  });
  const { theme } = useAppSelector((state) => state.user);
  // custom weekDays name
  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];
  const HeaderFont =
    "flex items-center justify-center text-2xl font-medium text-[#1E1E1E] dark:text-[#F7F9F9]";
  const HeaderDate = "text-208D8E mr-3 dark:text-[#F1B127]";

  // handle deadLine value and show deadline
  const handleDeadline = (date: any) => {
    const deadlineShow = date?.format("YYYY/MM/DD");
    const valueDate = date?.format("YYYY-MM-DDTHH:mm:ss");
    // convert
    const englishNum =
      valueDate != undefined && persianToEnglishNumber(valueDate);
    setValue(date);
    setDeadline({ ...deadline, showDeadline: deadlineShow, value: englishNum });
  };

  // convert persian selected number to english
  const persianToEnglishNumber = (number: any) => {
    return number.replace(/[\u06F0-\u06F9]/g, function (digit: string) {
      return String.fromCharCode(digit.charCodeAt(0) - 1728);
    });
  };

  return (
    <>
      <div
        className="modal opacity-100 pointer-events-auto bg-transparent visible"
        id="my-modal-2"
      >
        <div className="modal-box opacity-100 p-0 max-w-4xl min-w-[896px] h-5/6 min-h-[608px] max-h-[608px] rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.25)] dark:bg-[#15202B]">
          {/* calendar Header */}
          <div className="w-full h-32 border-b-2 flex items-center font-medium justify-around">
            <div className={HeaderFont}>
              <span className="ml-3">
                <BsCalendar4 />
              </span>
              ددلاین
              <span className={HeaderDate}>{deadline.showDeadline}</span>
            </div>
          </div>

          {/* calendar Content */}
          <div className="w-full h-4/6">
            <Calendar
              onChange={handleDeadline}
              value={value}
              weekDays={weekDays}
              headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
              monthYearSeparator=" "
              className={theme === "dark" ? "bg-dark teal" : `teal`}
              multiple={false}
              calendar={persian}
              locale={persian_fa}
            />
          </div>

          {/* calendar Footer */}
          <div className="w-full flex justify-end pl-8 gap-3 mt-2">
            <div className="w-32 h-8">
              <label
                htmlFor="my-modal"
                onClick={() => handleCalendar(false, deadline.value)}
                className={`w-full h-10 p-2.5 text-sm font-bold leading-4 cursor-pointer flex justify-center items-center text-white rounded-md ${
                  submitChangesHandler &&
                  "bg-[#ff3333] dark:bg-[#ff3333]  dark:text-[#0F111A]"
                } bg-208D8E dark:bg-[#F1B127] dark:text-[#0F111A]`}
              >
                بستن
              </label>
            </div>
            {submitChangesHandler && (
              <div className="w-32 h-8">
                <label
                  htmlFor="my-modal"
                  onClick={() => {
                    handleCalendar(false);
                    if (deadline && deadline.value)
                      submitChangesHandler(deadline.value);
                  }}
                  className="w-full h-10 p-2.5 text-sm font-bold leading-4 cursor-pointer flex justify-center items-center text-white rounded-md bg-208D8E dark:bg-[#F1B127] dark:text-[#0F111A]"
                >
                  ثبت
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickCalendar;
