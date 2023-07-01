import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { searchedWorkSpace } from "../../services/features/workSpaceList/workSpacesSlice";

type SearchInputProps = {
  placeHolder: string;
  extraClass?: string;
};

const SearchInput = ({ placeHolder, extraClass }: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const { workSpaces } = useAppSelector((state) => state.workSpaces);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const filteredWorkspaces = workSpaces.filter((workSpace) =>
        workSpace.name.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredWorkspaces.length === 0) {
        dispatch(searchedWorkSpace([]));
      }
      dispatch(searchedWorkSpace(filteredWorkspaces));
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query, workSpaces, dispatch]);

  return (
    <div
      className={`flex items-center bg-gray-50 gap-2 text-323232 ${extraClass}  dark:bg-[#1E2124] dark:text-[#F7F9F9] dark:border dark:border-[#F1B127] dark:rounded dark:px-2`}
    >
      <BiSearch/>
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={placeHolder}
        className="p-2 w-full h-full text-xs bg-gray-50 outline-none rounded-md dark:bg-[#1E2124] dark:text-[#F7F9F9]"
      />
    </div>
  );
};

export default SearchInput;
