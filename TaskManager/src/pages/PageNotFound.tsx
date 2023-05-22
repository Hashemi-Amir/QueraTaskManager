import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const PageNotFound = () => {
  const Navigate = useNavigate();
  return (
    <>
      <div className="h-screen w-full flex font-sans items-center justify-center flex-col gap-5">
        <b className="text-7xl">۴۰۴</b>
        <h1 className="text-7xl">صفحه مورد نظر یافت نشد!</h1>
        <div className="w-44 mt-8">
          <Button onClick={() => Navigate("/")} value="بازگشت به صفحه اصلی" />
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
