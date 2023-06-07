import NewSpace from "./NewSpace";
import ProfileButton from "../../ui/ProfileButton";
import SearchInput from "../../ui/SearchInput";
import WorkSpaceList from "./WorkSpaceList";
import SpaceMenu from "./SpaceMenu";
import { Link } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import {
  fetchWorkSpaces,
  selectWorkSpaces,
} from "../../../services/features/workSpaceList/workSpacesSlice";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { useEffect } from "react";
import ProjectList from "./ProjectList";

const SideBar = () => {
  const { isError, isSuccess, workSpaces } = useAppSelector(selectWorkSpaces);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkSpaces());
  }, []);

  // if (isSuccess) {
  //   console.log(workSpace);
  // } else if (isError) {
  //   console.log(isError);
  // }

  return (
    <div className=" flex flex-col w-1/5 h-screen py-10 pr-12 pl-4 border-l border-#AAAAAA  ">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-118C80 to-4AB7D8">
        کوئرا تسک منیجر
      </h1>
      <SpaceMenu workSpaces={(isSuccess && workSpaces) || []} />
      <SearchInput placeHolder="جستجو کنید" extraClass="my-3" />
      <NewSpace />
      <div className="my-5 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
        {(isSuccess &&
          workSpaces.map(({ name, _id }) => (
            <WorkSpaceList name={name} id={_id} key={_id} workSpaces={workSpaces}>
            </WorkSpaceList>
          ))) ||
          []}
      </div>
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
