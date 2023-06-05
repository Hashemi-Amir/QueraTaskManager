import { AiOutlinePlus ,AiOutlineLink } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import {SlNote} from 'react-icons/sl'
import {VscSymbolColor} from 'react-icons/vsc'
import Button from "../../ui/Button";
import { BiShareAlt } from "react-icons/bi";

type SideMoreProps = {
    sideMoreState : string
}

const SideMore = ({sideMoreState} : SideMoreProps) => {
    const liStyle = "w-full flex items-center text-sm font-normal  mt-3 cursor-pointer"
    return (
        <ul className='absolute top-0 -left-1/4  z-50 w-52 bg-white shadow-lg p-3 rounded-lg'>
            <li className="w-full flex items-center text-sm font-normal  mt-3 cursor-pointer">
                <span className="ml-4 text-xl"><AiOutlinePlus /></span>
               <span>ساختن {sideMoreState === 'تسک' ? 'تسک' : 'پروژه'} جدید</span>
            </li>
            <li className={liStyle}>
                <span className="ml-4 text-xl"><SlNote /></span>
                <span>ویرایش نام {sideMoreState === 'تسک' ? 'پروژه' : 'ورک اسپیس'}</span>
            </li>

            {
                sideMoreState === 'ورک اسپیس' &&
                <li className={liStyle}>
                    <span className="ml-4 text-xl"><VscSymbolColor /></span>
                    <span>ویرایش رنگ</span>
                </li>
            }

            <li className={liStyle}>
                <span className="ml-4 text-xl"><AiOutlineLink /></span>
                <span>کپی لینک</span>
            </li>  
            <li className={`${liStyle} text-9F0000`}>
                <span className="ml-4 text-xl"><BsTrash /></span>
                <span >حذف</span>
            </li>

            <li className="w-full relative flex  items-center mt-4">
                <span className="absolute right-5 text-2xl text-white "><BiShareAlt /></span>
                <Button value='اشتراک گذاری' className="hover:bg-208D8E hover:text-white" />
            </li>
              
        </ul>
    );
};

export default SideMore;