import { MouseEvent } from "react";

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
const titleFormat = function (date: any) {
  // console.log(date);
  return date.date.marker.toLocaleString("fa-IR", {
    // month: "long",
    // year: "numeric",
    dateStyle: "medium",
  });
};

// Header Toolbar Setting
const headerToolbar = {
  start: "today,prev,next",
  center: "title",
  end: "today",
};

// onClick Date
const dateClick = (info: any) => {
  // console.log(
  //   "Clicked on: " +
  //     info.dateStr +
  //     " Coordinates: " +
  //     info.jsEvent.pageX +
  //     "," +
  //     info.jsEvent.pageY +
  //     " Current view: " +
  //     info.view.type
  // );
  info.dayEl.style.backgroundColor = "red";
};

// Mouse Enter Events
const mouseEnterInfo = (info: any) => {
  // console.log(info.event);
};

const dayCellDidMount = (arg: any) => {
  const theElement = arg.el.querySelector(".fc-daygrid-day-frame");

  if (theElement && !theElement.hasAttribute("data-hover-attached")) {
    theElement.addEventListener("mouseenter", handleMouseEnter);
    theElement.addEventListener("mouseleave", handleMouseLeave);
    theElement.setAttribute("data-hover-attached", "");
  }
};

function handleMouseEnter(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.setAttribute("data-hover-attached", "true");
  // console.log('entered');
}

function handleMouseLeave(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.setAttribute("data-hover-attached", "false");
  // console.log('leaved');
}

// const dayCellWillUnmount = (arg: any) => {
//   const theElement = arg.el.querySelector(".fc-daygrid-day-frame");

//   if (theElement && theElement.hasAttribute("data-hover-attached")) {
//     theElement.removeEventListener("mouseenter", handleMouseEnter);
//     theElement.removeEventListener("mouseleave", handleMouseLeave);
//     theElement.removeAttribute("data-hover-attached");
//   }
// };

export {
  events,
  titleFormat,
  headerToolbar,
  dateClick,
  mouseEnterInfo,
  dayCellDidMount,
};
