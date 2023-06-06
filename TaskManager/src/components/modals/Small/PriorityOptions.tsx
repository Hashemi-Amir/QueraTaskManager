import { AiOutlineClose } from "react-icons/ai";
import { FiFlag } from "react-icons/fi";

type PriorityOptionsProps = {
    handlePriority : (e:any) => void,
    className? : string
}

const PriorityOptions = ({handlePriority , className}:PriorityOptionsProps) => {

    const liStyle = "w-full flex items-center px-3 mt-4 text-sm font-normal text-[#1E1E1E] cursor-pointer"
    const spanStyle = 'text-xl ml-3 pointer-events-none'
    return (
        <ul className={`absolute  -right-44 -top-20 pb-3 w-44  bg-white z-50 rounded-lg shadow-lg ${className}`}>
            <li 
                className={liStyle} 
                data-style='text-FB0606 border-FB0606' 
                onClick={(e)=>handlePriority(e)}
            >
                <span className={`${spanStyle} text-FB0606`} ><FiFlag /></span>
                فوری    
            </li>

            <li 
                className={liStyle} 
                data-style='text-FFE605 border-FFE605' 
                onClick={(e)=>handlePriority(e)} 
            >
                <span className={`${spanStyle} text-FFE605`} ><FiFlag /></span>
                بالا
            </li>

            <li 
                className={liStyle} 
                data-style='text-09DBCE border-09DBCE' 
                onClick={(e)=>handlePriority(e)}>
                    <span className={`${spanStyle} text-09DBCE`}><FiFlag /></span>
                    متوسط
            </li>

            <li
                className={liStyle} 
                data-style='text-[#B2ACAC] border-[#B2ACAC]'  
                onClick={(e)=>handlePriority(e)} >
                    <span className={`${spanStyle} text-[#B2ACAC]`}><FiFlag /></span>
                    پایین
            </li>

            <li 
                className={`${liStyle} mt-4`} 
                data-style='text-C1C1C1 border-C1C1C1' 
                onClick={(e)=>handlePriority(e)}>
                <span className={`${spanStyle} text-FB0606`}><AiOutlineClose /></span>
                حذف اولویت
            </li>
        </ul>
    );
};

export default PriorityOptions;