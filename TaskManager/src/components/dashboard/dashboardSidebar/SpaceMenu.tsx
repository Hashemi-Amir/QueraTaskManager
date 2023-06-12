import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import {
  fetchProjects,
  setSelectedSpace,
  setSelectedWorkSpaceId,
} from "../../../services/app/store";

type SpaceMenuProps = {
  workSpaces: {
    _id: string;
    name: string;
    user: string;
    members: [];
    projects: [];
  }[];
};

const SpaceMenu = ({ workSpaces }: SpaceMenuProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedValue(selectedId);
    if (selectedId) {
      dispatch(setSelectedSpace(selectedId));
      const workSpaceIndex = projects.findIndex((projects) => {
        return projects.workSpaceId === selectedId;
      });
      if (workSpaceIndex < 0 && selectedId != "ورک اسپیس‌ها") {
        dispatch(setSelectedWorkSpaceId(selectedId));
        dispatch(fetchProjects(selectedId));
      }
    }
  };

  return (
    <select
      value={selectedValue} // Use the selected value state variable
      onChange={handleSelectChange}
      className="p-2 bg-white outline-none focus:ring-1 focus:ring-208D8E blur:ring-none rounded-md mt-7 w-full font-semibold"
    >
      <option className="text-323232 font-semibold">ورک اسپیس‌ها</option>
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
