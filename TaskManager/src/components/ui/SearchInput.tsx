import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { searchedWorkSpace } from "../../services/features/workSpaceList/workSpacesSlice";

type SearchInput = {
  placeHolder: string;
  extraClass?: string;
};
const SearchInput = ({ placeHolder, extraClass }: SearchInput) => {
  const [query, setQuery] = useState("");
  const { workSpaces } = useAppSelector((state) => state.workSpaces);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredWorkspaces = workSpaces.filter((workSpace) =>
      workSpace.name.toLowerCase().includes(query.toLowerCase())
    );
    if(filteredWorkspaces.length == 0){
      dispatch(searchedWorkSpace([]))
    }
    dispatch(searchedWorkSpace(filteredWorkspaces));
  }, [query, workSpaces, dispatch]);

  return (
    <div className={`flex items-center bg-gray-50 gap-2 text-323232 ${extraClass}`}>
      <BiSearch />
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={placeHolder}
        className="p-2 w-full h-full text-xs bg-gray-50 outline-none rounded-md"
      />
    </div>
  );
};

export default SearchInput;
