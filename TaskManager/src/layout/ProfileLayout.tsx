import { BsArrowRight } from "react-icons/bs";
import { RiUserReceivedLine, RiUserSettingsLine } from "react-icons/ri";
import { RiUserFollowLine } from "react-icons/ri";
import Button from "../components/ui/Button";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const ProfileLayout = () => {
  // Styling the active NavLink in the sidebar
  const NavLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
      background: isActive ? "#b1e6e6" : "",
    };
  };

  const Navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex ">
      {/* SideBar */}
      <section className=" w-1/5 h-screen pt-10 border-l-[0.5px] border-[#AAAAAA]">
        <div className="w-[80%] flex flex-col mr-12">
          {/* Header */}
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#118C80] to-[#4AB7D8] bg-clip-text text-transparent">
            کوئرا تسک منیجر
          </h2>
          {/* Back Button */}
          <div className="self-start mt-20">
            <Button
              onClick={() => Navigate("/listview")}
              className="text-l px-2 py rounded-lg"
              value={"بازگشت"}
            >
              <BsArrowRight size={20} className="ml-2" />
            </Button>
          </div>
          {/* NavLinks */}
          <ul className=" flex flex-col gap-8 mt-11">
            <li>
              <NavLink
                style={NavLinkStyle}
                className="flex gap-3 cursor-pointer px-[10px] py-1 rounded hover:bg-[#c5ffff] transition-all"
                to={"/personalinfo"}
              >
                <RiUserReceivedLine size={24} fill="#323232" />
                <span className="font-medium text-xl text-1E1E1E">
                  اطلاعات فردی
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                style={NavLinkStyle}
                to={"/accountinfo"}
                className="flex gap-3 cursor-pointer px-[10px] py-1 rounded hover:bg-[#c5ffff] transition-all"
              >
                <RiUserFollowLine size={24} fill="#323232" />
                <span className="font-medium text-xl text-1E1E1E">
                  اطلاعات حساب
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profsettings"}
                style={NavLinkStyle}
                className="flex gap-3 cursor-pointer px-[10px] py-1 rounded hover:bg-[#c5ffff] transition-all"
              >
                <RiUserSettingsLine size={24} fill="#323232" />
                <span className="font-medium text-xl text-1E1E1E">تنظیمات</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
      {/* pages */}
      <section className="w-4/5 h-screen flex flex-col justify-center">
        <Outlet />
      </section>
    </div>
  );
};

export default ProfileLayout;
