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
    <>
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
        {/* {ref.getDate().toLocaleDateString("fa-IR", { dateStyle: "medium" })} */}
      </div>
    </>
  );
};

export default Date;
