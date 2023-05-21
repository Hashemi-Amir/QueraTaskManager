import { ReactNode } from "react";
import Button from "../components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";

type layout = {
  children: ReactNode;
  BtnValue: string;
};

const AuthLayout = ({ children, BtnValue }: layout) => {
  const Navigate = useNavigate();
  const Location = useLocation();

  // Getting the right message to show to the user based on the current route
  const signUpMessage =
    Location.pathname === "/login" || Location.pathname === "/"
      ? "ثبت نام نکرده ای؟"
      : "قبلا ثبت نام کرده‌ای؟";

  // Getting the right route to navigate based on the current route
  const NavigateTo =
    Location.pathname === "/login" || Location.pathname === "/"
      ? "/register"
      : "/login";

  const centerFlex = "flex items-center";

  return (
    <div className={`${centerFlex} flex-col justify-center w-screen h-screen`}>
      {children}
      <div
        className={`${centerFlex} w-5/6 h-13 absolute top-20 justify-between`}
      >
        <div>
          <h2 className="text-3xl font-extrabold leading-10 bg-clip-text text-transparent bg-gradient-to-r from-118C80 to-4AB7D8">
            کوئرا تسک منیجر
          </h2>
        </div>

        <div className="w-56 h-10 flex justify-start gap-2 items-center text-base text-black font-normal leading-6">
          <p className="flex-shrink-0">{signUpMessage}</p>

          <Button onClick={() => Navigate(NavigateTo)} value={BtnValue} />
        </div>
      </div>
      <div className="w-full h-2/3 absolute  top-1/3 -z-10">
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
