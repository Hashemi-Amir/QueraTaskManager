import { useEffect } from "react";
import Button from "../components/ui/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const Navigate = useNavigate();
  const Location = useLocation();
  const themeStatus = localStorage.getItem("theme");
  useEffect(() => {
    const htmlTag = document.querySelector("html");
    themeStatus === "dark"
      ? htmlTag?.classList.add("dark")
      : htmlTag?.classList.remove("dark");
  }, [themeStatus]);
  // Getting the right message to show to the user based on the current route
  const signUpMessage =
    Location.pathname === "/login" || Location.pathname === "/"
      ? "ثبت نام نکرده ای؟"
      : "قبلا ثبت نام کرده‌ای؟";

  const BtnValue = Location.pathname === "/login" ? "ثبت نام" : "ورود";

  // Getting the right route to navigate based on the current route
  const NavigateTo =
    Location.pathname === "/login" || Location.pathname === "/"
      ? "/register"
      : "/login";

  const centerFlex = "flex items-center";

  return (
    <div
      className={`${centerFlex} flex-col justify-center w-screen h-screen select-none dark:bg-[#0F111A]`}
    >
      <Outlet />
      <div
        className={`${centerFlex} w-5/6 h-13 absolute top-20 justify-between`}
      >
        <div>
          <h2 className="text-3xl font-extrabold leading-10 bg-clip-text text-transparent bg-gradient-to-r from-118C80 to-4AB7D8 dark:from-[#f1b127] dark:to-[#f8d893]">
            کوئرا تسک منیجر
          </h2>
        </div>

        <div className="w-56 h-10 flex justify-start gap-2 items-center text-base text-black font-normal leading-6">
          <p className="flex-shrink-0 dark:text-[#F7F9F9]">{signUpMessage}</p>

          <Button onClick={() => Navigate(NavigateTo)} value={BtnValue} />
        </div>
      </div>
      <div className="w-full h-2/3 absolute  top-1/3">
        <div
          className="w-full h-full"
          style={{
            clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)",
            background: `linear-gradient(269.55deg, ${
              themeStatus === "dark" ? "#0F2027" : "#06846F"
            } 0.35%, ${
              themeStatus === "dark" ? "#2C5364" : "#54BEE8"
            } 103.4%) `,
          }}
        ></div>
      </div>
    </div>
  );
};

export default AuthLayout;
