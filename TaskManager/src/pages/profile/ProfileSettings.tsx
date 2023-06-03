import Button from "../../components/ui/Button";
import { MdOutlineDone } from "react-icons/md";

const ProfileSettings = () => {
  return (
    <div className="w-80 mr-14">
      <h3 className="text-1E1E1E text-2xl font-bold mb-9">تنظیمات</h3>
      <div className="flex flex-col gap-12">
        {/* themes */}
        <div>
          <span className="text-sm font-normal block text-black mb-2">
            انتخاب تم
          </span>
          <ul className="flex gap-3 items-center">
            <li className="rounded-full w-10 h-10 grid place-content-center cursor-pointer bg-208D8E">
              <MdOutlineDone fill="white" />
            </li>
            <li className="rounded-full w-5 h-5 hover:scale-150 transition-all cursor-pointer bg-78C6B0"></li>
            <li className="rounded-full w-5 h-5 hover:scale-150 transition-all cursor-pointer bg-76BC86"></li>
            <li className="rounded-full w-5 h-5 hover:scale-150 transition-all cursor-pointer bg-80DC69"></li>
            <li className="rounded-full w-5 h-5 hover:scale-150 transition-all cursor-pointer bg-E46161"></li>
            <li className="rounded-full w-5 h-5 hover:scale-150 transition-all cursor-pointer bg-EC8182"></li>
            <li className="rounded-full w-5 h-5 hover:scale-150 transition-all cursor-pointer bg-F3C567"></li>
            <li className="rounded-full w-5 h-5 hover:scale-150 transition-all cursor-pointer bg-E17E80"></li>
            <li className="rounded-full w-5 h-5 hover:scale-150 transition-all cursor-pointer bg-F1A25C"></li>
          </ul>
        </div>
        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="rotate-180 toggle toggle-lg toggle-accent"
          />
          <span className="font-normal text-sm text-black">حالت شب</span>
        </div>

        {/* Submit Changes Button */}
        <Button value="ثبت تغییرات"></Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
