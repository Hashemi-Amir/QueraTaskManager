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
  return (
    <select className="p-2 bg-white outline-none focus:ring-1 focus:ring-208D8E  rounded-md mt-7 w-full  font-semibold  ">
      <option
        className=" bg-208D8E text-323232 font-semibold"
      >
        ورک اسپیس‌ها
      </option>
      {workSpaces.map(({ _id, name }) => (
        <option
          className="font-semibold bg-208D8E hover:text-white"
          key={_id}
          value={name}
        >
          {name}
        </option>
      ))}
    </select>
  );
};

export default SpaceMenu;
