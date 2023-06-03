import { BsListUl } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import TabBtn from "./TabBtn";
import SearchInput from "../../ui/SearchInput";
import Date from "./Date";
import Filter from "./Filter";
import Share from "../../ui/Share";

type HeaderProps = {
  projectName: string;
};

const Header = ({ projectName }: HeaderProps) => {
  const Location = useLocation();
  let date = false;
  const iconStyle = "w-5 h-5";
  const columnRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLAnchorElement>(null);
  const calendarRef = useRef<HTMLAnchorElement>(null);
  const marker = useRef<HTMLDivElement>(null);

  if (Location.pathname === "/calendarview") date = true;

  function indicator(e: EventTarget) {
    const parent = (e as HTMLElement).closest("a");
    if (marker.current) {
      marker.current.style.left = parent?.offsetLeft + "px";
      marker.current.style.width = parent?.offsetWidth + "px";
    }
  }

  useEffect(() => {
    if (marker.current && Location.pathname === "/listview") {
      indicator(listRef.current as EventTarget);
    }
    if (marker.current && Location.pathname === "/columnview") {
      indicator(columnRef.current as EventTarget);
    }
    if (marker.current && Location.pathname === "/calendarview") {
      indicator(calendarRef.current as EventTarget);
    }
  }, []);

  return (
    <div className="sm:pt-1 xl:pt-4 flex-grow">
      <div className="flex items-center justify-between border-b">
        <div className="flex items-center pt-4">
          <span className="text-xl font-semibold pl-4 pb-3 border-l-2 border-l-999999 ">
            {projectName}
          </span>

          <div className="flex items-center py-4 divide-x-2 relative">
            <div
              ref={marker}
              className="absolute h-1 w-0 bg-208D8E -bottom-0 left-0 duration-500 rounded-lg"
            ></div>
            <NavLink
              ref={listRef}
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
            <NavLink
              ref={columnRef}
              to={"/columnview"}
              onClick={(e) => indicator(e.target)}
            >
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
            <NavLink
              ref={calendarRef}
              to={"/calendarview"}
              onClick={(e) => indicator(e.target)}
            >
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
      <div className="flex items-center font-medium py-4 gap-4 border-b ">
        <span className="border-l-2 border-l-999999 pl-4">
          <SearchInput placeHolder="جستجو بین تسک ها" />
        </span>
        {date ? <Date /> : <Filter filter="وضعیت" />}
      </div>
    </div>
  );
};

export default Header;
