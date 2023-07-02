import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { searchedWorkSpace } from "../../services/features/workSpaceList/workSpacesSlice";
import {
  setSearchedTask,
  setSearchedTaskValue,
} from "../../services/features/boards/boardSlice";
import { useLocation } from "react-router-dom";

type SearchInputProps = {
  placeHolder: string;
  extraClass?: string;
  type: string;
};

const SearchInput = ({ placeHolder, extraClass, type }: SearchInputProps) => {
  const Location = useLocation();
  const [query, setQuery] = useState("");
  const { workSpaces } = useAppSelector((state) => state.workSpaces);
  const { selectedProjectId, projects } = useAppSelector(
    (state) => state.boards
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === "sideBar") {
      const debounceTimeout = setTimeout(() => {
        const filteredWorkspaces = workSpaces.filter((workSpace) =>
          workSpace.name.toLowerCase().includes(query.toLowerCase().trim())
        );
        if (filteredWorkspaces.length === 0) {
          dispatch(searchedWorkSpace([]));
        }
        dispatch(searchedWorkSpace(filteredWorkspaces));
      }, 1000);
      return () => {
        clearTimeout(debounceTimeout);
      };
    } else {
      const projectsIndex = projects.findIndex((project) => {
        return project.projectId === selectedProjectId;
      });

      const debounceTimeout = setTimeout(() => {
        dispatch(setSearchedTaskValue(query));
        const filteredBoards = projects[projectsIndex]?.projectBoards
          .map((board) => {
            const filteredTasks = board.tasks.filter(
              ({ name, description }) => {
                return (
                  name.toLowerCase().includes(query.toLowerCase().trim()) ||
                  description.toLowerCase().includes(query.toLowerCase().trim())
                );
              }
            );

            return { ...board, tasks: filteredTasks };
          })
          .filter((board) => board.tasks.length > 0);
          console.log(filteredBoards);
          
        if (filteredBoards?.length === 0 || query === "") {
          dispatch(setSearchedTask([]));
        } else dispatch(setSearchedTask(filteredBoards));
      }, 1000);
      return () => {
        clearTimeout(debounceTimeout);
      };
    }
  }, [query, workSpaces, dispatch, type, projects, selectedProjectId]);

  return (
    <div
      className={`flex items-center bg-gray-50 gap-2 text-323232 ${extraClass}  dark:bg-[#1E2124] dark:text-[#F7F9F9] dark:border dark:border-[#F1B127] dark:rounded dark:px-2`}
    >
      <BiSearch />
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        disabled={Location.pathname === "/listview" || Location.pathname === "/calendarview"}
        placeholder={placeHolder}
        className="p-2 w-full h-full text-xs bg-gray-50 outline-none rounded-md dark:bg-[#1E2124] dark:text-[#F7F9F9]"
      />
    </div>
  );
};

export default SearchInput;
