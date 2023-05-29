import { useState } from 'react';
import {IoIosArrowDown} from 'react-icons/io'
import Where from '../Small/Where';
import TagFilter from '../Small/TagFilter';
import { BsTrash } from 'react-icons/bs';



const FilterOptions = () => {
    const [whereModal , setWhereModal] = useState(false)
    const [TagsModal , setTagsModal] = useState(false)
    const [isOrNot , setIsOrNot] = useState(false)

    const filterOptionsStyle = 'relative py-1 px-2 rounded-md flex items-center justify-between text-xs text-D3D3D3 font-normal mr-3 border cursor-pointer'
    return (
        <li className="w-full flex justify-between items-center ">
            {/* options */}
            <div className="flex items-center">
                <span>تسک هایی که</span>
                <div 
                    className={`${filterOptionsStyle} w-44`}
                    
                >
                    <span onClick={()=> setWhereModal(!whereModal)}>انتخاب کنید </span>
                    <IoIosArrowDown />  
                    {whereModal && 
                        <Where />
                    }       
                </div>

                <span className='mr-3'>آن ها</span>

                <div 
                    className={`${filterOptionsStyle} w-36`}
                   
                >
                    <span  onClick={()=> setTagsModal(!TagsModal)}>انتخاب کنید </span>
                    <IoIosArrowDown />  
                    {TagsModal && 
                        <TagFilter />
                    }       
                </div>


                <div 
                    className={`${filterOptionsStyle} w-24`}
                   
                >
                    <span  onClick={()=> setIsOrNot(!isOrNot)}>انتخاب کنید </span>
                    <IoIosArrowDown />  
                    {isOrNot && 
                        <ul className='absolute top-7 left-0 text-xs bg-white text-black font-medium w-24 z-50 p-2 rounded-lg shadow-lg'>
                            <li className='mt-3'>است</li>
                            <li className='mt-3'>نیست</li>
                        </ul>
                    }       
                </div>
            </div>

            {/* delete options*/}
            <div className='cursor-pointer'>
                <BsTrash />
            </div>
        </li>
    );
};

export default FilterOptions;