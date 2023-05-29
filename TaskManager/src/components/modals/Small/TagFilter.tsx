import { BiSearch } from "react-icons/bi";


const TagFilter = () => {

    const liSayle = 'w-full mt-3 flex items-center pr-3 py-1 justify-between';
    const tagsStyle = 'px-2 py-1  rounded-md text-black text-sm font-normal cursor-pointer'
    return (
        <div className="absolute top-7 right-0 w-36  z-auto rounded-lg  bg-white shadow-lg">

            {/* searchBox */}
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
            
            {/* list of tags */}
            <ul className="w-full mt-3">
                <li className={liSayle}>
                    <span className={`${tagsStyle} bg-EBC8C8`}>درس</span>
                </li>

                <li className={liSayle}>
                    <span className={`${tagsStyle} bg-C3B7F2`}>کار</span>
                </li>

                <li className={liSayle}>
                    <span className={`${tagsStyle} bg-7FFAFA`}>پروژه</span>
                </li>
            </ul>
        </div>
    );
};

export default TagFilter;