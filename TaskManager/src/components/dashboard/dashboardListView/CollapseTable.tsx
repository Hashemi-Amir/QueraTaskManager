import { CiTextAlignRight } from "react-icons/ci";
import { FiFlag } from "react-icons/fi";
import avatar from "../../../assets/avatar.jpg"
import avatar2 from "../../../assets/avatar.png"

interface Task {
  id: number;
  title: string;
  members: string[];
  deadLine: string;
  priority: string;
  description: string;
}
interface StatusProjects {
  tasks: Task[];
}

const CollapseTable = ({ tasks }: StatusProjects) => {

  return (
    <table className="w-full text-right">
      <thead>
        <tr className="text-base font-medium">
          <th></th>
          <th>اعضا</th>
          <th>ددلاین</th>
          <th>اولویت</th>
          <th>توضیحات</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(({ id, title, deadLine }) => (
          <tr key={id} className="text-sm">
            <th className="flex items-center mr-16 py-6">
              <span className="w-4 h-4 bg-F92E8F rounded-sm ml-2 "></span>
              {title}
            </th>
            <th>
               <div className="flex items-center relative">
               <img src={avatar} alt="avatar" className="absolute right-7 w-9 h-9  rounded-full"/>
                <img src={avatar2} alt="avatar" className="absolute w-9 h-9  rounded-full"/>
               </div>
            </th>
            <td>{deadLine}</td>
            <td>
              <span className="text-FB0606">
                <FiFlag />
              </span>
            </td>
            <td>
              <CiTextAlignRight />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CollapseTable;
