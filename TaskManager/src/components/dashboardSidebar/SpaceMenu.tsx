import { useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const SpaceMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" flex justify-between items-center w-full h-9 mt-8 pl-2 font-semibold "
      >
        ورک اسپیس ها
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </button>
      {isOpen && (
        <div className="absolute w-full max-h-32 overflow-auto rounded-md border border-D3D3D3  list-none shadow-lg bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
          <li className="p-1 text-sm hover:bg-F0F1F3 cursor-pointer ">
            کارهای شخصی
          </li>
          <li className="p-1 text-sm hover:bg-F0F1F3 cursor-pointer">
            درس مدیریت پروژه
          </li>
          <li className="p-1 text-sm hover:bg-F0F1F3 cursor-pointer">
            درس کامپایلر
          </li>
          <li className="p-1 text-sm hover:bg-F0F1F3 cursor-pointer">
            کارهای شخصی
          </li>
          <li className="p-1 text-sm hover:bg-F0F1F3 cursor-pointer">
            کارهای شخصی
          </li>
        </div>
      )}
    </div>
  );
};

export default SpaceMenu;
