import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayGrid from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import faLocale from "@fullcalendar/core/locales/fa";
import { useEffect, useState } from "react";
import { SiAddthis } from "react-icons/si";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import Modal from "../../layout/Modal";
import AddTaskOnCalendar from "../../components/modals/Medium/AddTaskOnCalendar";
import { createPortal } from "react-dom";
import { VerboseFormattingArg } from "@fullcalendar/core/internal";
import {
  setDate,
  setRef,
} from "../../services/features/calendar/calendarSlice";
import "../../components/dashboard/dashboardCalendar/calendar.css";

type DayCellProps = {
  date: {
    marker: Date;
  };
  dayNumberText: string;
};
const Calendar = () => {
  const [todayDate, setTodayDate] = useState("");
  const [clickDate, setClickDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const calendarCell = document.querySelector(".fc-scrollgrid");
    if (theme === "Dark") {
      calendarCell?.classList.add("bg-[#15202B]");
    } else {
      calendarCell?.classList.remove("bg-[#15202B]");
    }
    dispatch(setDate(todayDate));
  }, [dispatch, theme, todayDate]);

  const handleNewTask = () => {
    setOpenModal(!openModal);
  };

  const dayCellContent = (props: DayCellProps) => {
    return (
      <div className="w-full h-full px-1 ">
        <div className="flex justify-between items-center w-full">
          <button
            onClick={handleNewTask}
            className="rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible m-1 transition-all ease-linear"
          >
            <SiAddthis
              size="1.8rem"
              className={
                "border-208D8E p-[1.5px] border-[4px] rounded-md text-center text-208D8E dark:text-[#F1B127] dark:border-[#F1B127]"
              }
            />
          </button>
          <div className="text-lg font-medium">{props.dayNumberText}</div>
        </div>
      </div>
    );
  };

  const titleFormat = ({ date }: VerboseFormattingArg) => {
    return date.marker.toLocaleString("fa-IR", {
      dateStyle: "medium",
    });
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, dayGrid]}
        initialView="dayGridMonth"
        locale={faLocale}
        dayCellContent={dayCellContent}
        datesSet={(args) => {
          dispatch(setRef(args.view.calendar));
          setTodayDate(
            args.view.calendar
              .getDate()
              .toLocaleDateString("fa-IR", { dateStyle: "medium" })
          );
        }}
        dayCellClassNames={"group"}
        viewClassNames={"bg-white"}
        dayHeaderClassNames={"!border-b-0 !text-right"}
        allDayClassNames={"!flex !justify-end"}
        height={"100%"}
        headerToolbar={false}
        dayMaxEvents={true}
        selectable={true}
        editable={true}
        fixedWeekCount={false}
        firstDay={6}
        titleFormat={titleFormat}
        dateClick={(arg) => {
          setClickDate(
            arg.date.toLocaleDateString("fa-IR", {
              month: "short",
              day: "numeric",
            })
          );
        }}
      />

      {openModal &&
        createPortal(
          <Modal>
            <AddTaskOnCalendar
              handleNewTask={handleNewTask}
              clickDate={clickDate}
            />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default Calendar;
