import NewSpace from "./NewSpace";
import ProfileButton from "../../ui/ProfileButton";
import SearchInput from "../../ui/SearchInput";
import WorkSpaceList from "./WorkSpaceList";
import SpaceMenu from "./SpaceMenu";
import { Link } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { fetchWorkSpace, selectWorkSpace } from "../../../services/features/workSpaceList/workSpaceSlice";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { useEffect } from "react";

const SideBar = () => {
  const data = [
    {
      spaceName: "درس مدیریت پروژه",
      spaceColor: "118C80",
    },
    {
      spaceName: "درس کامپایلر",
      projectName: ["پروژه اول", "پروژه دوم", "پروژه سوم"],
      spaceColor: "DE88FD",
    },
    {
      spaceName: "درس ساختمان داده",
      projectName: ["پروژه اول"],
      spaceColor: "6CB2F7",
    },
  ];

  const workSpaces = [
    "کارهای شخصی",
    "درس مدیریت پروژه",
    "درس کامپایلر",
    "درس ساختمان داده",
    "درس داده کاوی",
  ];

  const workSpace = useAppSelector(selectWorkSpace);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkSpace());
  }, []);
  console.log(workSpace.workSpace.data);


  return (
    <div className=" flex flex-col w-1/5 h-screen py-10 pr-12 pl-4 border-l border-#AAAAAA  ">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-118C80 to-4AB7D8">
        کوئرا تسک منیجر
      </h1>
      <SpaceMenu workSpaces={workSpaces} />
      <SearchInput placeHolder="جستجو کنید" extraClass="my-3" />
      <NewSpace />
      <WorkSpaceList spaceList={workSpace.workSpace.data} />
      <Link className="w-fit" to={"/personalinfo"}>
        <ProfileButton
          userName="نیلوفر موجودی"
          abbreviation="NM"
          className="w-9 h-9 p-2"
        />
      </Link>
      <Link className=" w-fit mt-5" to={"/login"}>
        <button className=" flex items-center gap-2 text-base text-818181 ">
          <RxExit className="w-4 h-4" />
          خروج
        </button>
      </Link>
    </div>
  );
};

export default SideBar;
