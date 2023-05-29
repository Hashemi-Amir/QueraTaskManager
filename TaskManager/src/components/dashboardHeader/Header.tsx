import TabBtn from "./TabBtn";
import SearchInput from "../SearchInput";
import Date from "./Date";
import Filter from "./Filter";

import { BsListUl } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { BsLayoutThreeColumns } from "react-icons/bs";
import Share from "../ui/Share";
import { NavLink, useLocation } from "react-router-dom";
import { useRef } from "react";

type HeaderProps = {
  projectName: string;
};

const Header = ({ projectName }: HeaderProps) => {
  const iconStyle = "w-5 h-5";
  const date = false;

  const Location = useLocation();

  const marker = useRef<HTMLDivElement>(null);

  function indicator(e: EventTarget) {
    if (marker.current) {
      marker.current.style.left = (e as HTMLElement).offsetLeft + "px";
      marker.current.style.width = (e as HTMLElement).offsetWidth + "px";
    }
  }

  return (
    <div className="h-[19vh] sm:pt-1 xl:pt-4">
      <div className="flex items-center justify-between border-b">
        <div className="flex items-center py-4 ">
          <span className="text-xl font-semibold pl-4 border-l-2 border-l-999999 ">
            {projectName}
          </span>

          <div className="flex items-center py-4 divide-x-2 relative">
            <div
              ref={marker}
              className="absolute h-1 w-0 bg-208D8E -bottom-4 left-0 duration-500 rounded-lg"
            ></div>
            <NavLink
              to={"/listview"}
              onClick={(e) => indicator(e.target)}
              className="border-l-2 border-l-999999"
            >
              <TabBtn
                classes={
                  Location.pathname === "/listview"
                    ? "text-208D8E font-bold"
                    : "text-323232 font-medium"
                }
                title="نمایش لیستی"
                icon={<BsListUl className={iconStyle} />}
              />
            </NavLink>
            <NavLink to={"/columnview"} onClick={(e) => indicator(e.target)}>
              <TabBtn
                classes={
                  Location.pathname === "/columnview"
                    ? "text-208D8E font-bold"
                    : "text-323232 font-medium"
                }
                title="نمایش ستونی"
                icon={<BsLayoutThreeColumns className={iconStyle} />}
              />
            </NavLink>
            <NavLink to={"/calendarview"} onClick={(e) => indicator(e.target)}>
              <TabBtn
                classes={
                  Location.pathname === "/calendarview"
                    ? "text-208D8E font-bold"
                    : "text-323232 font-medium"
                }
                title="تقویم"
                icon={<SlCalender className={iconStyle} />}
              />
            </NavLink>
          </div>
        </div>
        <Share />
      </div>
      <div className="flex items-center py-1 gap-4 border-b ">
        <span className="border-l-2 border-l-999999 pl-4">
          <SearchInput placeHolder="جستجو بین تسک ها" />
        </span>
        {date ? <Date /> : <Filter filter="وضعیت" />}
      </div>
    </div>
  );
};

export default Header;

// *********************************************************************************** //
// import TabBtn from "./TabBtn";
// import SearchInput from "../SearchInput";
// import Date from "./Date";
// import Filter from "./Filter";

// import { BsListUl } from "react-icons/bs";
// import { SlCalender } from "react-icons/sl";
// import { BsLayoutThreeColumns } from "react-icons/bs";
// import Share from "../ui/Share";
// import { NavLink, useLocation } from "react-router-dom";

// type HeaderProps = {
//   projectName: string;
// };

// const Header = ({ projectName }: HeaderProps) => {
//   const iconStyle = "w-5 h-5";
//   const date = false;

//   const Location = useLocation();

//   return (
//     <div className="h-[19vh] sm:pt-1 xl:pt-4">
//       <div className="flex items-center justify-between border-b">
//         <div className="flex items-center py-4 divide-x-2">
//           <span className="text-xl font-semibold pl-4 border-l-2 border-l-999999 ">
//             {projectName}
//           </span>

//           <NavLink to={"/listview"}>
//             <TabBtn
//               classes={
//                 Location.pathname === "/listview"
//                   ? "text-208D8E font-bold"
//                   : "text-323232 font-medium"
//               }
//               title="نمایش لیستی"
//               icon={<BsListUl className={iconStyle} />}
//             />
//           </NavLink>
//           <NavLink to={"/columnview"}>
//             <TabBtn
//               classes={
//                 Location.pathname === "/columnview"
//                   ? "text-208D8E font-bold"
//                   : "text-323232 font-medium"
//               }
//               title="نمایش ستونی"
//               icon={<BsLayoutThreeColumns className={iconStyle} />}
//             />
//           </NavLink>
//           <NavLink to={"/calendarview"}>
//             <TabBtn
//               classes={
//                 Location.pathname === "/calendarview"
//                   ? "text-208D8E font-bold"
//                   : "text-323232 font-medium"
//               }
//               title="تقویم"
//               icon={<SlCalender className={iconStyle} />}
//             />
//           </NavLink>
//         </div>
//         <Share />
//       </div>
//       <div className="flex items-center py-1 gap-4 border-b ">
//         <span className="border-l-2 border-l-999999 pl-4">
//           <SearchInput placeHolder="جستجو بین تسک ها" />
//         </span>
//         {date ? <Date /> : <Filter filter="وضعیت" />}
//       </div>
//     </div>
//   );
// };

// export default Header;
