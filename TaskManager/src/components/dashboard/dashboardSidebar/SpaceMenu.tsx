import { useAppDispatch } from "../../../services/app/hook";
import { fetchWorkSpaceById } from "../../../services/app/store";

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
  const dispatch = useAppDispatch();

  // Get selected workspace id
  function getId() {
    const optionEl = document.querySelector("#mySelect");
    if (optionEl instanceof HTMLSelectElement) {
      const id = optionEl.options[optionEl.selectedIndex].id;
      dispatch(fetchWorkSpaceById(id));
      console.log(id);
    }
  }

  return (
    <select
      id="mySelect"
      onChange={getId}
      className="p-2 bg-white outline-none focus:ring-1 focus:ring-208D8E  rounded-md mt-7 w-full  font-semibold  "
    >
      <option className="text-323232 font-semibold">
        ورک اسپیس‌ها
      </option>
      {workSpaces.map(({ _id, name }) => (
        <option
          className="font-semibold hover:text-white"
          key={_id}
          value={name}
          id={_id}
        >
          {name}
        </option>
      ))}
    </select>
  );
};

export default SpaceMenu;
