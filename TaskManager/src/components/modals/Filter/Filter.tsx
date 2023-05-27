// import FilterOptions from "./FilterOptions";

const Filter = () => {

    return (
        <>
            <label htmlFor="my-modal-3" className="btn">open modal</label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />

            <div className="modal bg-transparent">
                <div className="modal-box h-52  relative w-11/12 max-w-3xl rounded-lg shadow-lg py-4 px-5">

                    {/* filter header */}
                    <div className="w-full flex justify-between items-center">
                        <div className="text-2xl font-semibold text-black">فیلترها</div>
                        <label htmlFor="my-modal-3" className="text-xs text-black cursor-pointer" >✕</label>
                    </div>
                    {/* filter options */}
                    {/* <ul className="w-full mt-4 ">
                        <FilterOptions />
                    </ul> */}
                    {/* filter add button */}
                    <div className="mt-6 text-xs font-semibold text-208D8E cursor-pointer">افزودن فیلتر جدید</div>
                </div>
            </div>  
        </>
    );
};

export default Filter;