import { BiSearch } from "react-icons/bi";

type SearchInput = {
  placeHolder: string;
  extraClass?: string;
};
const SearchInput = ({ placeHolder, extraClass }: SearchInput) => {
  return (
    <div
      className={`flex h-10 p-3 my-3 bg-gray-50 rounded-md text-323232 ${extraClass}`}
    >
      <BiSearch className="fill-current" />
      <input
        type="text"
        placeholder={placeHolder}
        className="w-full text-xs bg-gray-50 mr-2 outline-none"
      />
    </div>
  );
};

export default SearchInput;
