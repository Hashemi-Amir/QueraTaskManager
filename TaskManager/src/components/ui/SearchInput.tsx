import { BiSearch } from "react-icons/bi";

type SearchInput = {
  placeHolder: string;
  extraClass?: string;
};
const SearchInput = ({ placeHolder, extraClass }: SearchInput) => {
  return (
    <div
      className={`flex gap-2 p-3 bg-gray-50 rounded-md text-323232  ${extraClass} `}
    >
      <BiSearch />
      <input
        type="text"
        placeholder={placeHolder}
        className="w-full h-full text-xs bg-gray-50  outline-none"
      />
    </div>
  );
};

export default SearchInput;
