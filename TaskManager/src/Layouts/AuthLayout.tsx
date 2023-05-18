import AuthBgSvg from "../assets/rect-bg.png";


type layout = {
  children: React.ReactNode;
};

const AuthLayout = (props: layout) => {

    const authLayoutWrapper = 'w-screen h-screen flex flex-col justify-center items-center';
    const authLayoutHeader = 'w-5/6 h-13 absolute top-20 flex justify-between items-center';
    const authLayoutHeaderTitle = 'text-3xl font-extrabold leading-10 bg-clip-text text-transparent bg-gradient-to-r from-green-16 to-blue-66';
    const authLayoutHeaderRegisterOffer = 'w-56 h-10 flex justify-start gap-2 items-center text-base text-black font-normal leading-6';
    const authLayoutHeaderRegisterOfferBtn = "w-24 h-10 bg-green-15 p-2.5 flex justify-center rounded-md items-center gap-2.5 font-bold text-sm leading-5 text-white";

    
    


  return (
    <div className={authLayoutWrapper}  >
      {props.children}
      <div className={authLayoutHeader} >
        <div>
          <h2 className={authLayoutHeaderTitle}>
            کوئرا تسک منیجر
          </h2>
        </div>

        <div className={authLayoutHeaderRegisterOffer}>

          <p>ثبت نام نکرده ای؟</p>

          <button className={authLayoutHeaderRegisterOfferBtn}>
            ثبت نام
          </button>
        </div>
      </div>
      <div className="w-screen h-1/2 absolute top-1/2 -z-10" >
          <img className="w-full h-full" src={AuthBgSvg}  />
          {/* <div className="w-screen h-[360px]" style={{clipPath : 'polygon(0 42%, 100% 0, 100% 100%, 0 100%)' , background: 'linear-gradient(269.55deg, #06846F 0.35%, #54BEE8 103.4%)'}}></div> */}
      </div>
    </div>
  );
};

export default AuthLayout;