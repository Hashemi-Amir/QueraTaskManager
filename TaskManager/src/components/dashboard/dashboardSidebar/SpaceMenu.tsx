import { useState } from "react";
import { useAppDispatch } from "../../../services/app/hook";
import {
  fetchProjects,
  fetchWorkSpaceById,
  resetProject,
  resetWorkspace,
} from "../../../services/app/store";

type SpaceMenuProps = {
  workSpaces: {
    _id: string;
    name: string;
    user: string;
    members: [];
    projects: [];
  }[];
  value: string;
};

const SpaceMenu = ({ workSpaces, value }: SpaceMenuProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const dispatch = useAppDispatch();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedValue(selectedId); // Update the selected value state variable
    if (selectedId) {
      dispatch(fetchWorkSpaceById(selectedId));
      dispatch(fetchProjects(selectedId));
    } else {
      dispatch(resetWorkspace());
      dispatch(resetProject());
    }
  };

  return (
    <select
      value={selectedValue} // Use the selected value state variable
      onChange={handleSelectChange}
      className="p-2 bg-white outline-none focus:ring-1 focus:ring-208D8E blur:ring-none rounded-md mt-7 w-full font-semibold"
    >
      <option className="text-323232 font-semibold" value="">
        ورک اسپیس‌ها
      </option>
      {workSpaces.map(({ _id, name }) => (
        <option
          className="font-semibold hover:text-white"
          key={_id}
          value={_id} // Use the workspace ID as the value of the option
        >
          {name}
        </option>
      ))}
    </select>
  );
};

export default SpaceMenu;
