import { ReactNode } from "react";
import Button from "../components/ui/Button";

type layout = {
  children: ReactNode;
  BtnValue: string;
};

const AuthLayout = ({ children, BtnValue }: layout) => {
  const authLayoutWrapper =
    "w-screen h-screen flex flex-col justify-center items-center";
  const authLayoutHeader =
    "w-5/6 h-13 absolute top-20 flex justify-between items-center";
  const authLayoutHeaderTitle =
    "text-3xl font-extrabold leading-10 bg-clip-text text-transparent bg-gradient-to-r from-208D8E to-4AB7D8";
  const authLayoutHeaderRegisterOffer =
    "w-56 h-10 flex justify-start gap-2 items-center text-base text-black font-normal leading-6";
  return (
    <div className={authLayoutWrapper}>
      {children}
      <div className={authLayoutHeader}>
        <div>
          <h2 className={authLayoutHeaderTitle}>کوئرا تسک منیجر</h2>
        </div>

        <div className={authLayoutHeaderRegisterOffer}>
          <p className="flex-shrink-0">قبلا ثبت نام کرده‌ای؟</p>

          <Button value={BtnValue} />
        </div>
      </div>
      <div className="w-full h-1/2 absolute  top-1/2 -z-10">
        <div
          className="w-full h-full"
          style={{
            clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(269.55deg, #06846F 0.35%, #54BEE8 103.4%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default AuthLayout;
