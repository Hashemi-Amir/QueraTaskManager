import FullCalendar from "@fullcalendar/react"; // must go before plugins
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import faLocale from "@fullcalendar/core/locales/fa";
import "./calendar.css";

const CalendarComp = () => {
  const events = [
    {
      title: "کنفرانس شیمی",
      start: "2023-05-25T10:30:00",
      end: "2023-05-29T11:30:00",
      extendedProps: {
        department: "بیوشیمی",
      },
      description: "کنفرانس",
    },
    {
      title: "جلسه کاری",
      start: "2023-05-03T12:10:00",
      end: "2023-05-08T11:30:00",
      color: "red",
      extendedProps: {
        department: "بیوشیمی",
      },
      description: "کنفرانس",
    },
  ];

  // Title Custom Format
  const titleFormat = function (date) {
    console.log(date);
    return date.date.marker.toLocaleString("fa-IR", {
      // month: "long",
      // year: "numeric",
      timeZone: "Asia/Tehran",
      dateStyle: "medium"
    });
  };

  // Header Toolbar Setting
  const headerToolbar = {
    start: "today,prev,next",
    center: "title",
    end: "",
  };

  // onClick Date
  const dateClick = (info) => {
    console.log(
      "Clicked on: " +
        info.dateStr +
        " Coordinates: " +
        info.jsEvent.pageX +
        "," +
        info.jsEvent.pageY +
        " Current view: " +
        info.view.type
    );
    info.dayEl.style.backgroundColor = "red";
  };

  // Mouse Enter Events
  const mouseEnterInfo = (info) => {
    console.log(info.event);
  };

  // const dayCellDidMount = (arg) => {
  //   {
  //     if (arg.el.classList.contains("fc-day-future")) {
  //       var theElement = arg.el.querySelectorAll(
  //         ".fc-daygrid-day-frame > .fc-daygrid-day-events"
  //       )[0];
  //       setTimeout(function () {
  //         if (
  //           theElement.querySelectorAll(".fc-daygrid-event-harness").length ===
  //           0
  //         ) {
  //           // check there's no event
  //           theElement.innerHTML =
  //             theElement.innerHTML +
  //             '<div class="text-center"><i class="calendar-icon fas fa-plus"></i></span></div>';
  //         }
  //       }, 10);
  //     }
  //   }
  // };

  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        momentTimezonePlugin,
      ]}
      locale={faLocale}
      events={events}
      headerToolbar={headerToolbar}
      initialView="dayGridMonth"
      timeZone={"Asia/Tehran"}
      height={"100vh"}
      buttonIcons={false} // show the prev/next text
      dayMaxEvents={true} // allow "more" link when too many events
      selectable={true}
      editable={true}
      navLinks={true}
      selectMirror={false}
      fixedWeekCount={false}
      dateClick={dateClick}
      eventMouseEnter={mouseEnterInfo}
      titleFormat={titleFormat}
      // dayCellDidMount={dayCellDidMount}
    />
  );
};

export default CalendarComp;
