import { useState } from "react";
import { BsThreeDots, BsPlus } from "react-icons/bs";

type HeaderProps = {
  title: string;
  borderColor: string;
  number: string;
};
const Header = ({ title, borderColor, number }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardHover = (isHovering: boolean) => {
    setIsHovered(isHovering);
  };

  return (
    <div
      className={`flex items-center justify-between w-[250px] bg-white sticky top-0 h-10 rounded px-3 py-2 mb-5 border border-t-2 text-1E1E1E ${borderColor} shadow-[0px_2px_8px_rgba(0,0,0,0.18)]`}
      onMouseOver={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
    >
      <div className="flex items-center gap-1">
        <div>{title}</div>
        <div className="flex justify-center items-center h-4 w-3 p-1 rounded-full bg-F4F4F4 text-[10px] leading-5">
          {number}
        </div>
      </div>
      {isHovered && (
        <div className="flex items-center gap-1">
          <span className="hover:scale-110">
            <BsThreeDots />
          </span>
          <span
            className="hover:scale-110 text-xl data-[title]:text-red-500"
            title="افزودن تسک"
          >
            <BsPlus />
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
