import CheckBoxColor from "../../ui/CheckBoxColor";
import avatar from '../../../assets/avatar.png'
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

const NewWorkspaceThree = () => {

    const fontList = 'text-sm font-semibold text-black'
    const liStyle = 'w-full flex justify-between items-center'
    return (
        <>
            <ul className="w-full px-3 py-6 flex flex-col border rounded-lg ">
                {/* workspace name */}
                <li className={liStyle}>
                    <span className={fontList}>نام ورک اسپیس</span>
                    <span className={fontList}>تیم طراحی</span>
                </li>

                {/* workspace color*/}

                <li className={`mt-6 ${liStyle}`} >
                    <span className={fontList}>رنگ ورک اسپیس</span>
                    <span className={fontList}><CheckBoxColor id={2} className="bg-[#80DC69]"/></span>
                </li>
                {/* workspace members */}


                <li className={`mt-6 ${liStyle}`} >
                    <span className={fontList}>اعضا</span>
                    <span className='w-9 h-9 rounded-full' >
                        <img src={avatar} alt="avatar" className="w-full h-full object-cover"/>
                    </span>
                </li>
            </ul>

            <div className='mt-16'>
                <Link to='selectColor'><Button value='ساختن ورک اسپیس'/></Link> 
            </div>  
        </>
    );
};

export default NewWorkspaceThree;