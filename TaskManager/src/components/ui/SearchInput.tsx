import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { setSearchedWorkSpace } from "../../services/features/workSpaceList/workSpacesSlice";

import { useLocation } from "react-router-dom";
import { RefObject } from "react";
import {
  setSearchedTask,
  setSearchedTaskValue,
} from "../../services/features/boards/boardSlice";

type SearchInputProps = {
  placeHolder: string;
  extraClass?: string;
  type: string;
};

const SearchInput = ({ placeHolder, extraClass, type }: SearchInputProps) => {
  const Location = useLocation();
  const searchInputRef: RefObject<HTMLInputElement> = useRef(null);
  const [query, setQuery] = useState("");
  const { workSpaces } = useAppSelector((state) => state.workSpaces);
  const { selectedProjectId, projects } = useAppSelector(
    (state) => state.boards
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchInputRef.current && searchInputRef.current.name === "header") {
      if (Location.pathname !== "/columnview") {
        searchInputRef.current.disabled = true;
      } else if (!selectedProjectId) {
        searchInputRef.current.disabled = true;
      } else {
        searchInputRef.current.disabled = false;
      }
    }

    const debounceTimeout = setTimeout(() => {
      if (searchInputRef.current && searchInputRef.current.name === "sideBar") {
        const filteredWorkspaces = workSpaces.filter((workSpace) =>
          workSpace.name.toLowerCase().includes(query.toLowerCase().trim())
        );
        dispatch(
          setSearchedWorkSpace(
            filteredWorkspaces.length === 0 ? [] : filteredWorkspaces
          )
        );
      } else if (
        searchInputRef.current &&
        searchInputRef.current.name === "header" &&
        Location.pathname === "/columnview"
      ) {
        const projectsIndex = projects.findIndex(
          (project) => project.projectId === selectedProjectId
        );
        dispatch(setSearchedTaskValue(query));

        const filteredBoards = projects[projectsIndex]?.projectBoards
          .map((board) => {
            const filteredTasks = board.tasks.filter(
              ({ name, description }) =>
                name.toLowerCase().includes(query.toLowerCase().trim()) ||
                description.toLowerCase().includes(query.toLowerCase().trim())
            );
            return { ...board, tasks: filteredTasks };
          })
          .filter((board) => {
            return board.tasks.length > 0;
          });

        dispatch(
          setSearchedTask(
            filteredBoards?.length === 0 || query === "" ? [] : filteredBoards
          )
        );
      }
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [
    Location.pathname,
    dispatch,
    projects,
    query,
    selectedProjectId,
    workSpaces,
  ]);

  return (
    <div
      className={`flex items-center bg-gray-50 gap-2 text-323232 ${extraClass}  dark:bg-[#1E2124] dark:text-[#F7F9F9] dark:border dark:border-[#F1B127] dark:rounded dark:px-2`}
    >
      <BiSearch />
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        name={type}
        ref={searchInputRef}
        placeholder={placeHolder}
        className="p-2 w-full h-full text-xs bg-gray-50 outline-none rounded-md dark:bg-[#1E2124] dark:text-[#F7F9F9]"
      />
    </div>
  );
};

export default SearchInput;
