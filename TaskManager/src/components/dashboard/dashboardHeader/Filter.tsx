import { BsSliders } from "react-icons/bs";
type FilterProps = {
  filter: string;
};
const Filter = ({ filter }: FilterProps) => {
  return (
    <>
      <div className="flex gap-4 text-xs p-2">
        <button className="flex gap-2">
          <BsSliders />
          <span>فیلترها</span>
        </button>
        <span>دسته بندی شده با: {filter}</span>
      </div>
    </>
  );
};

export default Filter;
