import { AiOutlineClose } from "react-icons/ai";
import { FiFlag } from "react-icons/fi";

const PriorityOptions = () => {

    const liStyle = "w-full flex items-center mt-4 text-sm font-normal text-[#1E1E1E] cursor-pointer"
    return (
        <ul className="absolute -right-44 -top-5 w-44 p-3 bg-white z-40 rounded-lg shadow-lg">
            <li className={liStyle} >
                <span className="text-xl ml-3 text-FB0606"><FiFlag /></span>
                <p>فوری</p>
            </li>

            <li className={liStyle} >
                <span className="text-xl ml-3 text-FFE605"><FiFlag /></span>
                <p>بالا</p>
            </li>

            <li className={liStyle} >
                <span className="text-xl ml-3 text-09DBCE"><FiFlag /></span>
                <p>متوسط</p>
            </li>

            <li className={liStyle} >
                <span className="text-xl ml-3 text-[#B2ACAC]"><FiFlag /></span>
                <p>پایین</p>
            </li>

            <li className={`${liStyle} mt-4`}>
                <span className="text-xl ml-3 text-FB0606"><AiOutlineClose /></span>
                <p>حذف اولویت</p>
            </li>
        </ul>
    );
};

export default PriorityOptions;