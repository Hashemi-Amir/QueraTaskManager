import { createPortal } from "react-dom";
import { BsSliders } from "react-icons/bs";
import Modal from "../../../layout/Modal";
import FilterModal from "../../modals/Large/FilterModal";
import { useState } from "react";
type FilterProps = {
  filter: string;
};
const Filter = ({ filter }: FilterProps) => {
  const [filterModal , setFilterModal] = useState(false)

  return (
    <div className="flex gap-4 text-xs p-2">
      <button className="flex gap-2" onClick={()=>setFilterModal(true)}>
        <BsSliders />
        <span>فیلترها</span>
      </button>
      <span>دسته بندی شده با: {filter}</span>

      {filterModal && createPortal(
        <Modal className='bg-transparent'>
          <FilterModal setFilterModal={setFilterModal} />
        </Modal>,
        document.body
      )}
    </div>
  );
};

export default Filter;
