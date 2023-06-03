import { useSelector } from "react-redux";
import { selectCalendar } from "../../../services/features/calendar/calendarSlice";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

const Date = () => {
  const calendar = useSelector(selectCalendar);

  return (
    <>
      <button onClick={() => calendar.ref.today()}>امروز</button>
      <button title="سال بعد" onClick={() => calendar.ref.nextYear()}>
        <MdKeyboardDoubleArrowRight />
      </button>
      <button title="ماه بعد" onClick={() => calendar.ref.next()}>
        <MdKeyboardArrowRight />
      </button>
      <button title="ماه قبل" onClick={() => calendar.ref.prev()}>
        <MdKeyboardArrowLeft />
      </button>
      <button title="سال قبل" onClick={() => calendar.ref.prevYear()}>
        <MdKeyboardDoubleArrowLeft />
      </button>
      <div>{calendar.date}</div>
    </>
  );
};

export default Date;
