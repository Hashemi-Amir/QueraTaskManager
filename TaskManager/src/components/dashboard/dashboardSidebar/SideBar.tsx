import NewSpace from "./NewSpace";
import ProfileButton from "../../ui/ProfileButton";
import SearchInput from "../../ui/SearchInput";
import WorkSpaceList from "./WorkSpaceList";
import SpaceMenu from "./SpaceMenu";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../../services/features/auth/authSlice";
import { RxExit } from "react-icons/rx";
import { fetchAllWorkSpaces, resetAllState } from "../../../services/app/store";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  ProjectProps,
} from "../../../services/features/workSpaceList/workSpacesSlice";

export type workSpacesType = {
  _id: string;
  name: string;
  user: string;
  projects: ProjectProps;
}[];

const SideBar = () => {
  const {
    message,
    isError,
    isLoading,
    isSuccess,
    workSpaces,
    selectedSpace,
    searchedWorkSpace,
  } = useAppSelector((state) => state.workSpaces);
  const { user } = useAppSelector((state) => state.auth);
  const Navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    !isSuccess && workSpaces.length === 0 && dispatch(fetchAllWorkSpaces());
  }, [dispatch, selectedSpace, workSpaces.length, isSuccess, workSpaces]);

  const getSelectedWorkSpaces = workSpaces.filter((workSpace) => {
    return workSpace._id === selectedSpace;
  });

  const workSpacesToRender = getSelectedWorkSpaces.length
    ? getSelectedWorkSpaces
    : searchedWorkSpace
    ? searchedWorkSpace
    : isSuccess
    ? workSpaces
    : [];


  return (
    <div className="flex flex-col w-1/5 h-screen py-10 pr-12 pl-4 border-l border-#AAAAAA dark:border-[rgb(241,177,39,0.5)]">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-118C80 to-4AB7D8 dark:from-[#f1b127] dark:to-[#f8d893]">
        کوئرا تسک منیجر
      </h1>
      <SpaceMenu workSpaces={workSpaces || []} />
      <SearchInput
        placeHolder="جستجو کنید"
        extraClass="my-3"
        type="sideBar"
      />
      <NewSpace />
      {isLoading && (
        <AiOutlineLoading3Quarters
          size="2rem"
          color="208D8E"
          className="m-auto animate-spin"
        />
      )}
      {isError && <div className="m-auto text-FB0606">{`${message}`}</div>}
      {isSuccess && <WorkSpaceList workSpaces={workSpacesToRender} />}
      <Link className="w-fit" to="/personalinfo">
        <ProfileButton userName={user?.username} className="w-9 h-9 p-2" />
      </Link>
      <button
        className="w-fit mt-5 flex items-center gap-2 text-base text-818181"
        onClick={() => {
          dispatch(resetAllState());
          dispatch(logOut());
          Navigate("/login");
        }}
      >
        <RxExit className="w-4 h-4" />
        خروج
      </button>
    </div>
  );
};

export default SideBar;
