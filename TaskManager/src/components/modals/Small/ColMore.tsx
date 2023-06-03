import { AiOutlinePlus } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import {SlNote} from 'react-icons/sl'


const ColMore = () => {
    const liStyle = 'flex items-center cursor-pointer mt-3 text-sm text-[#1E1E1E] font-normal'
    return (
        <ul className="absolute w-40 left-0 rounded-lg p-3 z-50 bg-white shadow-lg">
            <li className={liStyle}> 
                <span className='text-sm'><SlNote /></span>
                <p className="mr-2">ویرایش نام ستون</p>
            </li>

            <li className={liStyle}> 
                <span className='text-sm'><AiOutlinePlus /></span>
                <p className="mr-2">افزودن تسک</p>
            </li>

            <li className={liStyle}> 
                <span className='text-sm'><BiArchiveIn /></span>
                <p className="mr-2">آرشیو تمام تسک‌ها</p>
            </li>

            <li className={liStyle}> 
                <span className='text-sm'><BsTrash /></span>
                <p className="mr-2">حذف ستون</p>
            </li>
        </ul>
    );
};

export default ColMore;