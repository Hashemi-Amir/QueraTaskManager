import NewSpace from "./NewSpace";
import ProfileButton from "../ProfileButton";
import SearchInput from "../SearchInput";
import WorkSpaceList from "./WorkSpaceList";
import SpaceMenu from "./SpaceMenu";
import { Link } from "react-router-dom";

import { RxExit } from "react-icons/rx";

const SideBar = () => {
  const data = [
    {
      spaceName: "درس مدیریت پروژه",
      spaceColor: "92FF07",
    },
    {
      spaceName: "درس کامپایلر",
      projectName: ["پروژه اول", "پروژه دوم", "پروژه سوم"],
      spaceColor: "DE88FD",
    },
    {
      spaceName: "درس ساختمان داده",
      projectName: ["پروژه اول"],
      spaceColor: "DE88FD",
    },
  ];

  const workSpaces = [
    "کارهای شخصی",
    "درس مدیریت پروژه",
    "درس کامپایلر",
    "درس ساختمان داده",
    "درس داده کاوی",
  ];

  return (
    <div className=" flex flex-col w-1/5 h-screen py-10 pr-12 pl-4 border-l border-#AAAAAA  ">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-118C80 to-4AB7D8">
        کوئرا تسک منیجر
      </h1>
      <SpaceMenu workSpaces={workSpaces} />
      <SearchInput placeHolder="جستجو کنید" extraClass="my-3" />
      <NewSpace />
      <WorkSpaceList spaceList={data} />

      <Link className="w-fit" to={"/personalinfo"}>
        <ProfileButton userName="نیلوفر موجودی" abbreviation="NM" />
      </Link>

      <Link className="w-fit" to={"/login"}>
        <button className=" flex items-center gap-2 mt-5 mr-1 text-base text-818181 ">
          <RxExit className="w-4 h-4" />
          خروج
        </button>
      </Link>
    </div>
  );
};

export default SideBar;
