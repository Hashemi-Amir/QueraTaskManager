import { CgAddR } from "react-icons/cg";

const NewSpace = () => {
  return (
    <button className="flex justify-center items-center gap-1 py-3 rounded-md bg-D3D3D3 text-xs font-semibold hover:bg-gradient-to-r from-118C80 to-4AB7D8">
      <CgAddR className="w-4 h-4" />
      ساختن اسپیس جدید
    </button>
  );
};

export default NewSpace;
