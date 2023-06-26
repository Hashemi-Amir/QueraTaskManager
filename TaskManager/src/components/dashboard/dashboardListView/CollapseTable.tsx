import { CiTextAlignRight } from "react-icons/ci";
import { FiFlag } from "react-icons/fi";
import avatar from "../../../assets/avatar.jpg";
import avatar2 from "../../../assets/avatar.png";
import { Task } from "../../../services/features/boards/boardSlice";

interface StatusProjects {
  tasks: Task[];
  color: string;
}

const CollapseTable = ({ tasks, color }: StatusProjects) => {
  return (
    <>
      {!tasks[0] ? (
        <div className="m-auto">تسکی جهت نمایش وجود ندارد ☹️</div>
      ) : (
        <table className="w-full text-right">
          <thead>
            <tr className="text-base font-medium ">
              <th className=""></th>
              <th>اعضا</th>
              <th>ددلاین</th>
              <th>اولویت</th>
              <th>توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ _id, name,description }) => (
              <tr key={_id} className="text-sm">
                <th className="flex items-center mr-16 py-6">
                  <span className={`w-4 h-4 ${color} rounded-sm ml-2 `}></span>
                  {name}
                </th>
                <th>
                  <div className="flex items-center relative">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="absolute right-7 w-9 h-9  rounded-full"
                    />
                    <img
                      src={avatar2}
                      alt="avatar"
                      className="absolute w-9 h-9  rounded-full"
                    />
                  </div>
                </th>
                <td>
                  {/* {getPersianDate(deadline).split(" ").slice(0, 2).join(" ")} */}
                  ۲۵ مهر
                </td>
                <td>
                  <span className="text-FB0606">
                    <FiFlag size="1.1rem"/>
                  </span>
                </td>
                <td>
                  <CiTextAlignRight size="1.1rem" title={description}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CollapseTable;
