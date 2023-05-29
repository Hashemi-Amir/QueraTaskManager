import FullCalendar from "@fullcalendar/react"; 
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import faLocale from "@fullcalendar/core/locales/fa";
import "../components/dashboard/dashboardCalendar/calendar.css";
import {
  dateClick,
  mouseEnterInfo,
  titleFormat,
  dayCellDidMount,
} from "../components/dashboard/dashboardCalendar/calendarOptions";

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        momentTimezonePlugin,
      ]}
      locale={faLocale}
      // events={events}
      headerToolbar={false}
      initialView="dayGridMonth"
      timeZone={"Asia/Tehran"}
      height={"80vh"}
      dayMaxEvents={true}
      selectable={true}
      editable={true}
      navLinks={true}
      selectMirror={false}
      fixedWeekCount={false}
      dateClick={dateClick}
      eventMouseEnter={mouseEnterInfo}
      titleFormat={titleFormat}
      dayCellDidMount={dayCellDidMount}
    />
  );
};

export default Calendar;
