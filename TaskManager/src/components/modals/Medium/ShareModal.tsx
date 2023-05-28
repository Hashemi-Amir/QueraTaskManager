import Button from "../../ui/Button";
import {FiLink} from 'react-icons/fi'
import avatar from '../../../assets/avatar.png'
import {IoIosArrowDown} from 'react-icons/io'
import { useState } from "react";
import Permission from "../Small/Permission";


type ShareModalProps = {
    ModalTitle : string,
}

const ShareModal = ({ModalTitle}:ShareModalProps) => {
    const [permissionModal , setPermissionModal] = useState(false)
    return (
        <div className="modal-box overflow-visible w-3/4 max-w-lgl">
            {/* modal content */}
            <div className="p-5 bg-white rounded-lg">

                {/* card header */}
                <div className="w-full flex justify-between items-center">             
                    <label htmlFor="my-modal-3" className="text-323232 cursor-pointer">✕</label>
                    
                    <div className="font-semibold text-2xl text-black">
                        {ModalTitle}
                    </div>

                    <span></span>

                </div>

                
                {/* card content */}
                <div className="mt-11 w-full">
                    <div  className="w-full flex flex-col relative">

                        {/* Send invite Link  */}
                        <div className="flex">
                            <input 
                                type='email'
                                placeholder="دعوت با ایمیل"
                                name="invite"
                                className="w-4/5 h-10 p-3 bg-F0F1F3 rounded-tr-lg rounded-br-lg text-sm font-normal focus:outline-none "
                            />

                            <div className="w-24">
                                <Button value='ارسال' className="rounded-tr-none rounded-br-none" />
                            </div>
                        </div>


                        {/* Special Link */}
                        <div className="w-full mt-7 flex justify-between items-center">
                            <div className="flex items-center">
                                <FiLink />
                                <span className="mr-3 text-sm font-normal text-[#1E1E1E]">لینک خصوصی</span>
                            </div>

                            <div className="w-20 h-6 px-3 py-1 text-xs flex items-center justify-center font-normal text-[#1E1E1E] rounded-md border border-[#E9EBF0]">
                                کپی لینک
                            </div>
                        </div>

                        {/* List of Members */}
                        <div className="mt-7 flex flex-col">
                            <h4 className="text-sm font-normal text-[#7D828C]">اشتراک گزاشته شده با</h4>
                            <ul >
                                <li className="w-full mt-5 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9">
                                            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-[#1E1E1E] text-sm font-normal mr-2">من</span>
                                        <span className="w-28 mr-3 px-2 py-1 rounded-md flex items-center justify-center bg-A5E4F8 font-normal text-xs">workspace owner</span>
                                    </div>

                                    <div className="w-26 rounded-md py-1 px-2 text-sm flex items-center justify-center font-normal border border-[#E9EBF0]">دسترسی کامل</div>
                                </li>

                                <li className="w-full mt-5"> 
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-9 h-9 flex justify-center items-center bg-F27474 rounded-full">
                                                SR
                                            </div>
                                            <span className="w-28 mr-4 px-2 py-1 rounded-md flex items-center justify-center font-normal text-sm">sararahimi@gmail.com</span>

                                        </div>

                                        <div 
                                            className="relative w-26 rounded-md py-1 px-2 text-sm flex items-center justify-center font-normal border border-[#E9EBF0] cursor-pointer"
                                            onClick={()=> setPermissionModal(!permissionModal)} 
                                        >
                                            <span className="ml-4" >دسترسی کامل</span>
                                            <IoIosArrowDown />
                                            {permissionModal && 
                                                <Permission />
                                            }
                                        </div>


                                    </div>
                                </li>
                            </ul>
                        </div>

                        
                    </div>
                </div>

            </div>
        </div>

    );
}
export default ShareModal;