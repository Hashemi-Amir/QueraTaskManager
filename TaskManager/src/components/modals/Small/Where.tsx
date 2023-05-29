import { BiSearch } from "react-icons/bi";

const Where = () => {
    const liStyle = 'w-full text-xs font-medium px-2 py-1 text-black mt-3'

    return (
        <div className="absolute top-7 right-0 w-44 bg-white z-50  rounded-lg shadow-lg">
            {/* search box */}
            <div className="w-full flex flex-row-reverse items-center border-b justify-center bg-transparent">
                <input 
                    type="text" 
                    placeholder="جستجو فیلتر ها"
                    name="tagInp"
                    id="tagInp"
                    className="w-3/4 text-xs bg-transparent focus:outline-none"
                />
                <span className="ml-3 pr-2 text-208D8E text-2xl"><BiSearch /></span>
            </div>

            {/* list of where */}
            <ul className="w-full"  >
                <li className={liStyle}>تاریخ</li>
                <li className={liStyle}>تگ</li>
                <li className={liStyle}>اعضا</li>
                <li className={liStyle}>اولویت</li>
            </ul>
        </div>

    );
};

export default Where;