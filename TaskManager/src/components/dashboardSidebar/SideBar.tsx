import NewSpace from "./NewSpace";
import ProfileButton from "../ProfileButton";
import SearchInput from "../SearchInput";
import WorkSpaceList from "./WorkSpaceList";
import SpaceMenu from "./SpaceMenu";

import { RxExit } from "react-icons/rx";

const SideBar = () => {
  const data = [
    {
      spaceName: "درس مدیریت پروژه",
      spaceColor: "DE88FD",
    },
    {
      spaceName: "درس مدیریت پروژه",
      projectNAme: "پروژه اول",
      spaceColor: "DE88FD",
    },
  ];

  return (
    <div className="flex flex-col w-80 h-screen border-l border-#AAAAAA p-10">
      <h1 className="text-3xl font-extrabold leading-10 bg-clip-text text-transparent bg-gradient-to-r from-118C80 to-4AB7D8">
        کوئرا تسک منیجر
      </h1>
      <SpaceMenu />
      <SearchInput placeHolder="جستجو کنید" extraClass="w-full" />
      <NewSpace />
      <WorkSpaceList spaceList={data} />
      <div className="flex flex-col gap-5">
        <ProfileButton userName="نیلوفر موجودی" abbreviation="NM" />
        <button className=" flex items-center gap-2  text-base text-818181 ">
          <RxExit className="w-4 h-4" />
          خروج
        </button>
      </div>
    </div>
  );
};

export default SideBar;
