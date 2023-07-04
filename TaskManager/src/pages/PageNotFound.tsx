import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import group from "../assets/group-404.png";
import groupDark from "../assets/group-404-Dark.png";
import notFound from "../assets/notFound.png";
import notFoundDark from "../assets/notFound-dark.png";
import { useAppSelector } from "../services/app/hook";
const PageNotFound = () => {
  const { theme } = useAppSelector((state) => state.user);
  const Navigate = useNavigate();
  return (
    <div className="h-screen  py-24 items-center flex justify-between dark:bg-[#0F111A] dark:text-white">
      <div className="w-full pr-52 ">
        <img src={theme === "dark" ? groupDark : group} />
      </div>
      <div className="w-full pb-12 ">
        <div className="mb-10 ">
          <img
            src={theme === "dark" ? notFoundDark : notFound}
            className="rounded-3xl p-5 "
          />
        </div>
        <div>
          <h1 className="my-2 text-gray-800 font-bold text-2xl dark:text-gray-400">
            این راه به جایی نمیرسد!
          </h1>
          <p className="my-2 text-gray-600 dark:text-gray-400">
            به نظر آدرس را اشتباه وارد کرده‌اید، برای پیدا کردن مسیر درست
            میتوانید سری به صفحه اصلی بزنید
          </p>
          <div className="w-44 mt-9">
            <Button onClick={() => Navigate("/")} value="بازگشت به صفحه اصلی" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
