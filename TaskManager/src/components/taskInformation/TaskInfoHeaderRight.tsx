import { RiArrowLeftSLine, RiUserAddLine } from "react-icons/ri";
import DashedBorderCard from "../ui/DashedBorderCard";
import { BsCheckSquare } from "react-icons/bs";
import { FiFlag } from "react-icons/fi";
import Share from "../ui/Share";
import avatar from "../../assets/avatar.jpg";

const TaskInfoHeaderRight = () => {
  return (
    <div className="w-1/2 h-full ml-[1px] relative">
      <div className="w-full  h-14 absolute bottom-6 flex place-content-between items-center px-4">
        {/* Task Info Right */}
        <div className="h-9 flex items-center gap-7">
          {/* Status Changer */}
          <div className="flex rounded-sm hover:shadow-[0px_0px_0px_2px_#F84747] transition-all ">
            <div
              role="button"
              className="w-28 h-8 text-white bg-F84747 flex items-center justify-center"
            >
              Open
            </div>
            <button className="bg-F84747 mr-[2px] text-white ">
              <RiArrowLeftSLine size="24"></RiArrowLeftSLine>
            </button>
          </div>
          {/* Set To Complete */}
          <BsCheckSquare role="button" size="32" color="#BDBDBD" />
          {/* Assign task */}
          <div dir="ltr" className="flex -space-x-2 ">
            <DashedBorderCard classes="border-C1C1C1">
              <RiUserAddLine color="#C1C1C1" size="20"></RiUserAddLine>
            </DashedBorderCard>

            <div className="w-8 cursor-pointer">
              <img className="rounded-full" draggable={false} src={avatar} />
            </div>
            <div className="w-8 cursor-pointer">
              <img className="rounded-full" draggable={false} src={avatar} />
            </div>
          </div>
          {/* Priority Flag */}
          <DashedBorderCard classes="border-FB0606">
            <FiFlag color="#FB0606" size="20" />
          </DashedBorderCard>
        </div>
        {/* Share */}
        <div>
          <Share />
        </div>
      </div>
    </div>
  );
};

export default TaskInfoHeaderRight;
