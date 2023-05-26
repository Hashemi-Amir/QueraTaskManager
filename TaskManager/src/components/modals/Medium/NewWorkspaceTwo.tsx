import { Link } from "react-router-dom";
import CheckBoxColor from "../../ui/CheckBoxColor";
import Button from "../../ui/Button";
import {BiBlock} from 'react-icons/bi'

const NewWorkspaceTwo = () => {

    const dataColor = [
        {id : 1 , color : 'bg-[#84C6A1]'},
        {id : 2 , color : 'bg-[#78C6B0]'},
        {id : 3 , color : 'bg-[#76BC86]'},
        {id : 4 , color : 'bg-[#80DC69]'},
        {id : 5 , color : 'bg-[#E46161]'},
        {id : 6 , color : 'bg-[#E17E80]'},
        {id : 7 , color : 'bg-[#EC8182]'},
        {id : 8 , color : 'bg-[#F3C567]'},
        {id : 9 , color : 'bg-[#B9995E]'},
        {id : 10 , color : 'bg-[#E57A57]'},
        {id : 11 , color : 'bg-[#F1A25C]'},
        {id : 12 , color : 'bg-[#E28A60]'},
        {id : 13, color : 'bg-[#6897C2]'},
        {id : 14, color : 'bg-[#74AADD]'},
        {id : 15, color : 'bg-[#3C45E7]'},
        {id : 16, color : 'bg-[#6DAFCE]'},
        {id : 17, color : 'bg-[#6CB2F7]'},
        {id : 18, color : 'bg-[#9286EA]'},
        {id : 19, color : 'bg-[#C074D1]'},
        
    ]
    return (
        <>
            {/* select color */}
            <div className="w-full flex">
                {/* avatar */}
                <div className="w-24 h-16 bg-[#7D828C] rounded-lg text-2xl font-semibold text-white flex justify-center items-center">
                    ت ط
                </div>

                {/* list of colors */}
                <div className="mr-9 flex flex-col">
                    <span className="text-sm text-black">رنگ ورک اسپیس</span>
                    <ul className="mt-5  h-10 flex justify-start content-between flex-wrap">

                        <li className="h-4 w-4 mr-3 rounded-sm hover:cursor-pointer text-black"><BiBlock /></li>
                        {dataColor.map(li => <CheckBoxColor key={li.id} id={li.id} className={li.color} />)}
                    </ul>
                </div>


            </div>  

            {/* button */}
            <div className='mt-16'>
                <Link to='browsing_info'><Button value='ادامه'/></Link> 
            </div>  
        </>
    );
};

export default NewWorkspaceTwo;