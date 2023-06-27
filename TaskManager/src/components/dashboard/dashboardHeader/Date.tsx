import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useAppSelector } from "../../../services/app/hook";

const Date = () => {
  const { ref, date } = useAppSelector((state) => state.calendar);


  return (
    <div className="flex items-center gap-2">
      <button onClick={() => ref.today()}>امروز</button>
      <button title="سال بعد" onClick={() => ref.nextYear()}>
        <MdKeyboardDoubleArrowRight />
      </button>
      <button title="ماه بعد" onClick={() => ref.incrementDate({ month: 1 })}>
        <MdKeyboardArrowRight />
      </button>
      <button title="ماه قبل" onClick={() => ref.incrementDate({ month: -1 })}>
        <MdKeyboardArrowLeft />
      </button>
      <button title="سال قبل" onClick={() => ref.prevYear()}>
        <MdKeyboardDoubleArrowLeft />
      </button>
      <div>
        {date}
      </div>
    </div>
  );
};

export default Date;
