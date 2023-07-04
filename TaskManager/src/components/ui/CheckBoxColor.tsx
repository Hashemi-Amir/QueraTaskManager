import { AiOutlineCheck } from "react-icons/ai";

type CheckBoxColorProps = {
  data?: any;
  handleCheckBoxColor?: (data: any) => void;
  selectedColor?: any;
};

const CheckBoxColor = ({
  data,
  handleCheckBoxColor,
  selectedColor,
}: CheckBoxColorProps) => {
  const active = data.id === selectedColor.id ? "scale-150" : "";
  return (
    <li
      className={`h-4 w-4 mr-3 list-none rounded-sm hover:cursor-pointer ${data.color} ${active}`}
      id={data.id}
      onClick={() => handleCheckBoxColor?.(data)}
    >
      {data.id === selectedColor.id && <AiOutlineCheck />}
    </li>
  );
};

export default CheckBoxColor;
