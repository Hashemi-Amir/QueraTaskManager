import TabBtn from "./TabBtn";
import SearchInput from "../SearchInput";
import Date from "./Date";
import Filter from "./Filter";

import { BsListUl } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { BsLayoutThreeColumns } from "react-icons/bs";

type HeaderProps = {
  projectName: string;
};

const Header = ({ projectName }: HeaderProps) => {
  let iconStyle = "w-5 h-5";
  let date = false;

  return (
    <div className="h-40 pt-12">
      <div className="flex items-center justify-between border-b">
        <div className="flex items-center py-4 ">
          <span className="text-xl font-semibold pl-4 border-l-2 border-l-999999">
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
        <span>اشتراک</span>
      </div>
      <div className="flex items-center gap-4 border-b border-b-AAAAAA divide-x-2">
        <SearchInput placeHolder="جستجو بین تسک ها" />

        {date ? <Date /> : <Filter filter="وضعیت" />}
      </div>
    </div>
  );
};

export default Header;
