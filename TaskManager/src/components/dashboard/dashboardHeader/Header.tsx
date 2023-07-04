import { BsListUl } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TabBtn from "./TabBtn";
import SearchInput from "../../ui/SearchInput";
import Date from "./Date";
import Filter from "./Filter";
import Share from "../../ui/Share";
import { RxUpdate } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { fetchBoards, fetchProjects } from "../../../services/app/store";
import { resetBoards } from "../../../services/features/boards/boardSlice";
import { setTheme } from "../../../services/features/user/userSlice";

type HeaderProps = {
  projectName: string;
};

const Header = ({ projectName }: HeaderProps) => {
  const Location = useLocation();
  const { selectedWorkSpaceId } = useAppSelector((state) => state.workSpaces);
  const { selectedProjectId, isLoading: boardsIsLoading } = useAppSelector(
    (state) => state.boards
  );
  const { isLoading: projectIsLoading } = useAppSelector(
    (state) => state.projects
  );
  const dispatch = useAppDispatch();
  let date = false;
  const iconStyle = "w-5 h-5";
  const columnRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLAnchorElement>(null);
  const calendarRef = useRef<HTMLAnchorElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const { theme } = useAppSelector((state) => state.user);
  const [themeStatus, setThemeStatus] = useState(theme === "dark");
  const handleDarkMode = () => {
    const newThemeStatus = theme === "dark" ? "light" : "dark";
    setThemeStatus(newThemeStatus === "dark");
    const htmlTag = document.querySelector("html");
    htmlTag?.classList.toggle("dark");
    localStorage.setItem("theme", newThemeStatus);
    dispatch(setTheme(newThemeStatus));
  };

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
    if (marker.current && Location.pathname === "/") {
      indicator(listRef.current as EventTarget);
    }
    if (marker.current && Location.pathname === "/columnview") {
      indicator(columnRef.current as EventTarget);
    }
    if (marker.current && Location.pathname === "/calendarview") {
      indicator(calendarRef.current as EventTarget);
    }
  }, [Location.pathname]);

  // update columnView or listView state when click update btn
  const updateClickHandler = () => {
    if (Location.pathname === "/listview" && selectedWorkSpaceId !== "") {
      dispatch(fetchProjects(selectedWorkSpaceId));
      dispatch(resetBoards());
    }
    if (Location.pathname === "/columnview" && selectedProjectId !== "")
      dispatch(fetchBoards(selectedProjectId));
  };

  return (
    <div className="sm:pt-1 xl:pt-4 flex-grow">
      <div className="flex items-center justify-between border-b dark:border-b-[rgb(241,177,39,0.5)]">
        <div className="flex items-center pt-4">
          <span
            className={`text-xl font-semibold pl-4 pb-3 ${
              (Location.pathname === "/listview" && selectedWorkSpaceId) ||
              (Location.pathname === "/columnview" && selectedProjectId)
                ? "border-l-2 border-l-999999 dark:border-l-[rgb(241,177,39,0.5)]"
                : ""
            }`}
          >
            {projectName}
          </span>

          <div className="flex items-center py-4 divide-x-2 relative dark:divide-[rgb(241,177,39,0.5)]">
            <div
              ref={marker}
              className="absolute h-[3px] w-0 bg-208D8E -bottom-[2px] left-0 duration-500 rounded-lg dark:bg-[#F1B127]"
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
                    ? "text-208D8E font-bold dark:text-[#F1B127]"
                    : "text-323232 font-medium dark:text-[#F7F9F9]"
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
                    ? "text-208D8E font-bold dark:text-[#F1B127]"
                    : "text-323232 font-medium dark:text-[#F7F9F9]"
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
                    ? "text-208D8E font-bold dark:text-[#F1B127]"
                    : "text-323232 font-medium dark:text-[#F7F9F9]"
                }
                title="تقویم"
                icon={<SlCalender className={iconStyle} />}
              />
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4 divide-x-2 divide-x-reverse dark:divide-[rgb(241,177,39,0.5)]">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleDarkMode}
              checked={themeStatus}
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <div className="pr-5 py-1 ">
            <Share />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between font-medium py-4 gap-4 border-b dark:border-b-[rgb(241,177,39,0.5)]">
        <div className="flex items-center gap-4">
          <span className="border-l-2 border-l-999999 pl-4 dark:border-l-[rgb(241,177,39,0.5)]">
            <SearchInput placeHolder="جستجو بین تسک ها" type="header" />
          </span>
          {date ? <Date /> : <Filter filter="وضعیت" />}
        </div>
        {!Location.pathname.includes("calendarview") && (
          <button
            className="flex gap-1 items-center"
            onClick={updateClickHandler}
          >
            <RxUpdate
              className={
                (projectIsLoading || boardsIsLoading) && "animate-spin"
              }
            />
            <span>بروزرسانی</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
