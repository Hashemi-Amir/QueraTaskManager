import DropDownCard from "../../ui/DropDownCard";
import {IoIosArrowDown} from 'react-icons/io'



const FilterOptions = () => {
    return (
        <li className="w-full flex justify-between ">
            {/* options */}
            <div className="flex">
                <span>تسک هایی که</span>
                <div className="w-44">
                    
                    <DropDownCard>
                        <label tabIndex={0} className="mr-3 w-full border flex items-center justify-between text-xs">
                            <span >انتخاب کنید </span><IoIosArrowDown />
                        </label>
                    </DropDownCard>                
                </div>

            </div>

            {/* delete options*/}
        </li>
    );
};

export default FilterOptions;