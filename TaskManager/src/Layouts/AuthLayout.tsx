import AuthButtons from "../Components/AuthButton";
import AuthBgSvg from '../assets/rect-bg.png'

const AuthLayout = () => {
    return (
        <div className={`w-screen h-screen  flex flex-col items-center bg-custom-image bg-no-repeat bg-cover bg-bottom-1`} style={{backgroundImage : `url(${AuthBgSvg})`}} >
            <div className="w-[1280px] h-[51px] absolute top-[80px] flex flex-row-reverse justify-between items-center" >
                <div>
                    <h2 className="text-[32px] font-extrabold leading-[51px] bg-clip-text text-transparent bg-gradient-to-r from-[#118C80] to-[#4AB7D8]">کوئرا تسک منیجر</h2>
                </div>
                <div className="w-[218px] h-[40px] flex justify-end gap-[7px] items-center text-[16px] text-black font-normal leading-[24px]">
                   
                    <button className="w-[95px] h-[40px] bg-[#208D8E] p-[10px] flex justify-center rounded-[6px] items-center gap-[10px] font-bold text-[14px] leading-[22px] text-white">ثبت نام</button>
                    <p>ثبت نام نکرده ای؟</p>
                </div>
            </div>
            <AuthButtons value="ورود" />

        </div>
    );
};

export default AuthLayout;