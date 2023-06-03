import { BiSearch } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import TagMore from "./TagMore";
import { useState } from "react";


const Tags = () => {
    const [openMore , setOpenMore] = useState(false)

    const liSayle = 'w-full mt-3 flex items-center justify-between';
    const tagsStyle = 'px-2 py-1  rounded-md text-black text-sm font-normal cursor-pointer'
    return (
        <div className="absolute -top-24 mr-4  w-48 p-3 z-auto rounded-lg right-0 bg-white shadow-lg ">

            {/* searchBox */}
            <div className="w-full px-3 py-1 flex flex-row-reverse items-center justify-center rounded-md bg-[#E9E9E9]">
                <input 
                    type="text" 
                    placeholder="جستجو یا ساختن تگ"
                    name="tagInp"
                    id="tagInp"
                    className="w-3/4 text-xs bg-transparent focus:outline-none"
                />
                <span className="ml-3 text-[#BDBDBD] text-2xl"><BiSearch /></span>
            </div>
            
            {/* list of tags */}
            <ul className="w-full h-28 mt-3 ">
                <li className={liSayle}>
                    <span className={`${tagsStyle} bg-EBC8C8`}>درس</span>
                    <span className="text-BDC0C6 cursor-pointer" onClick={()=> setOpenMore(!openMore)}><FiMoreHorizontal /></span>
                    <div className="absolute left-0 top-20">
                        {openMore && 
                            <TagMore />                    
                        }
                    </div>

                </li>

                <li className={liSayle}>
                    <span className={`${tagsStyle} bg-C3B7F2`}>کار</span>
                    <span className="text-BDC0C6 cursor-pointer"><FiMoreHorizontal /></span>
                </li>

                <li className={liSayle}>
                    <span className={`${tagsStyle} bg-7FFAFA`}>پروژه</span>
                    <span className="text-BDC0C6 cursor-pointer"><FiMoreHorizontal /></span>
                </li>
            </ul>
        </div>
    );
};

export default Tags;