import CloseIcon from "../../ui/Close";
import FilterOptions from "./FilterOptions";

type filterModalProps = {
    handleFilterModal : () => void
}


const FilterModal = ({handleFilterModal}:filterModalProps) => {
    
    return (
        <>
            <div className="modal-box absolute top-1/4 right-1/4 min-h-52 bg-white z-50 overflow-visible w-11/12 max-w-3xl rounded-lg shadow-xl py-4 px-5">

                {/* filter header */}
                <div className="w-full flex justify-between items-center">
                    <div className="text-2xl font-semibold text-black">فیلترها</div>
                    <label htmlFor="my-modal-3" className="text-xs text-black cursor-pointer" onClick={handleFilterModal} ><CloseIcon /></label>
                </div>


                {/* filter options */}
                <ul className="w-full mt-4 ">
                    <FilterOptions />
                </ul> 



                {/* filter add button */}
                <div className="mt-6 text-xs font-semibold text-208D8E cursor-pointer">افزودن فیلتر جدید</div>
            </div>
        </>
    );
};

export default FilterModal;