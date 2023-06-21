import { VscSymbolColor } from "react-icons/vsc";
import { SlNote } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";
import CheckBoxColor from "../../ui/CheckBoxColor";
import { useState } from "react";

type TagMorePosition = {
  position : {
    top?: number,
    left?: number
  }
}

const TagMore = ({position}:TagMorePosition) => {
  const [selectedColor, setSelectedColor] = useState({
    color: "bg-[#7D828C]",
    id: 0,
  });
  const handleCheckBoxColor = (data: any): any => {
    setSelectedColor({ ...selectedColor, color: data.color, id: data.id });
  };
  const [colorModal, setColorModal] = useState(false);
  const liStyle = "w-full flex mt-3 items-center cursor-pointer";
  const dataColor = [
    { id: 1, color: "bg-[#84C6A1]" },
    { id: 2, color: "bg-[#78C6B0]" },
    { id: 3, color: "bg-[#76BC86]" },
    { id: 4, color: "bg-[#80DC69]" },
    { id: 5, color: "bg-[#E46161]" },
    { id: 6, color: "bg-[#E17E80]" },
    { id: 7, color: "bg-[#EC8182]" },
    { id: 8, color: "bg-[#F3C567]" },
    { id: 9, color: "bg-[#B9995E]" },
    { id: 10, color: "bg-[#E57A57]" },
    { id: 11, color: "bg-[#F1A25C]" },
    { id: 12, color: "bg-[#E28A60]" },
    { id: 13, color: "bg-[#6897C2]" },
    { id: 14, color: "bg-[#74AADD]" },
    { id: 15, color: "bg-[#3C45E7]" },
    { id: 16, color: "bg-[#6DAFCE]" },
    { id: 17, color: "bg-[#6CB2F7]" },
    { id: 18, color: "bg-[#9286EA]" },
    { id: 19, color: "bg-[#C074D1]" },
    { id: 20, color: "bg-[#486774]" },
  ];

  return (
    <ul
      style={{top:position.top,left:position.left}} 
      className=" absolute w-28 bg-white  border p-2 rounded-lg shadow-md">
      <li className={liStyle}>
        <span className="text-xs text-[#1E1E1E] ml-2">
          <AiOutlineClose />
        </span>
        <p className="text-xs">حذف</p>
      </li>

      <li className={liStyle}>
        <span className="text-xs text-[#1E1E1E] ml-2">
          <SlNote />
        </span>
        <p className="text-xs">ویرایش تگ</p>
      </li>

      <li className={liStyle} onClick={() => setColorModal(!colorModal)}>
        <span className="text-xs text-[#1E1E1E] ml-2">
          <VscSymbolColor />
        </span>
        <p className="relative text-xs">ویرایش رنگ</p>
        {colorModal && (
          <ul className="absolute -top-4 mr-28 border w-40 h-32 flex content-between flex-wrap z-50 bg-white rounded-lg py-2 px-1 shadow-xl">
            {dataColor.map((li) => (
              <CheckBoxColor
                key={li.id}
                data={li}
                selectedColor={selectedColor}
                handleCheckBoxColor={handleCheckBoxColor}
              />
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default TagMore;
