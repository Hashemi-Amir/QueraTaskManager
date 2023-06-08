import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import faLocale from "@fullcalendar/core/locales/fa";
import "../../components/dashboard/dashboardCalendar/calendar.css";
import { SiAddthis } from "react-icons/si";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setDate,
  setRef,
} from "../../services/features/calendar/calendarSlice";
import moment from "moment";
import { createPortal } from "react-dom";
import Modal from "../../layout/Modal";
import AddTaskOnCalendar from "../../components/modals/Medium/AddTaskOnCalendar";

const Calendar = () => {
  const [todayDate, setTodayDate] = useState("");
  const [openModal , setOpenModal] = useState(false) 

  const dispatch = useDispatch();
  const calendarEl = useRef<any | null>(null);

  const handleNewTask = () => {
    setOpenModal(!openModal)
  }
  useEffect(() => {
    dispatch(setDate(todayDate));
    dispatch(setRef(calendarEl.current.getApi()));
  }, [todayDate]);

  const dayCellContent = (props: any) => {
    return (
      <div className="w-full h-full px-1">
        <div className="flex justify-between items-center w-full">
          <button 
            onClick={handleNewTask}
            className="rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible m-1 transition-all ease-linear">
            <SiAddthis
              size="1.8rem"
              color="#208D8E"
              className={
                "border-208D8E p-[1.5px] border-[4px] rounded-md text-center"
              }
            />
          </button>
          <div className="text-lg font-medium">{props.dayNumberText}</div>
        </div>
      </div>
    );
  };
  const titleFormat = (date: any) => {
    return date.date.marker.toLocaleString("fa-IR", {
      dateStyle: "medium",
    });
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={faLocale}
        dayCellContent={dayCellContent}
        datesSet={(args) =>
          setTodayDate(
            args.view.calendar
              .getDate()
              .toLocaleDateString("fa-IR", { dateStyle: "medium" })
          )
        }
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
        titleFormat={titleFormat}
        ref={calendarEl}
      />


      {openModal && createPortal(
        <Modal >
          <AddTaskOnCalendar handleNewTask={handleNewTask} todayDate={todayDate}/>
        </Modal>,
        document.body
      )}
    </>

  );
};

export default Calendar;
