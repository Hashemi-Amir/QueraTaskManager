import TabBtn from "./TabBtn";
import SearchInput from "../SearchInput";
import Date from "./Date";
import Filter from "./Filter";

import { BsListUl } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { BsLayoutThreeColumns } from "react-icons/bs";
import Share from "../ui/Share";

type HeaderProps = {
  projectName: string;
};

const Header = ({ projectName }: HeaderProps) => {
  const iconStyle = "w-5 h-5";
  const date = false;

  return (
    <div className="h-[19vh] sm:pt-1 xl:pt-4">
      <div className="flex items-center justify-between border-b">
        <div className="flex items-center py-4 divide-x-2">
          <span className="text-xl font-semibold pl-4 border-l-2 border-l-999999 ">
            {projectName}
          </span>

          <TabBtn
            title="نمایش لیستی"
            icon={<BsListUl className={iconStyle} />}
          />
          <TabBtn
            title="نمایش ستونی"
            icon={<BsLayoutThreeColumns className={iconStyle} />}
          />
          <TabBtn title="تقویم" icon={<SlCalender className={iconStyle} />} />
        </div>
        <Share />
      </div>
      <div className="flex items-center py-1 gap-4 border-b ">
        <span className="border-l-2 border-l-999999 pl-4">
          <SearchInput placeHolder="جستجو بین تسک ها" />
        </span>
        {date ? <Date /> : <Filter filter="وضعیت" />}
      </div>
    </div>
  );
};

export default Header;
