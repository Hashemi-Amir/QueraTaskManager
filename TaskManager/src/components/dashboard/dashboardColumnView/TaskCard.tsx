import { useState } from "react";
import { CiTextAlignRight } from "react-icons/ci";
import ProfileButton from "../../ui/ProfileButton";
import { FiCheckCircle, FiFlag } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
// import ColMore from "../../modals/Small/ColMore";

const TaskCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [colMoreModal , setColMoreModal] = useState(false)

  const handleCardHover = (isHovering: boolean) => {
    setIsExpanded(isHovering);
  };

  return (
    <div
      className="border w-[250px] rounded p-3 bg-white text-1E1E1E shadow-[0px_6px_8px_rgba(0,0,0,0.14)] mb-3"
      onMouseOver={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
    >
      <div className="flex justify-between items-baseline mb-2">
        <div className="h-4 font-medium leading-4 text-right text-534D60 text-[10px]">
          پروژه اول
        </div>
        {isExpanded && (
          <ProfileButton
            abbreviation="NM"
            className="w-6 h-6 pt-[3px] text-[10px]"
          />
        )}
      </div>
      <div className="flex items-center justify-start mb-5 gap-1">
        <div className="font-medium text-xs text-0E0E0E leading-4 text-right">
          این یک تیتر برای این تسک است
        </div>
        <div className="text-xs text-BDC0C6 ">
          <CiTextAlignRight />
        </div>
      </div>
      <div className="flex justify-start items-center pb-5 text-[10px] gap-1">
        <span className="text-FB0606">
          <FiFlag />
        </span>
        <div className="text-343434">۵ مهر - فردا</div>
        <span className="text-BDC0C6">
          <div className="form-control">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                className="checkbox checkbox-success w-3 h-3 mb-[2px]"
              />
            </label>
          </div>
        </span>
        <div className="text-BDC0C6">۲۳/۲</div>
      </div>
      <div className="flex gap-3">
        <span className="bg-BFFDE3 text-[10px] p-1 rounded-l-2xl">درس</span>
        <span className="bg-EEDFF6 text-[10px] p-1 rounded-l-2xl">پروژه</span>
      </div>
      <div
        className={`pt-4  overflow-hidden justify-between border-t flex  mt-5 transition-all duration-1000 ease-in-out ${
          isExpanded ? "max-h-screen " : "h-0"
        }`}
      >
        <div className="hover:text-208D8E hover:scale-110" >
          <FiCheckCircle />
        </div>
        <div className="hover:scale-110" >
          <BsThreeDots />

          {/* {colMoreModal && <ColMore />} */}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
