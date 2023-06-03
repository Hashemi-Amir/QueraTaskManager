import { CgClose } from "react-icons/cg";

interface CloseIconProps {
  classes?: string;
}

const CloseIcon = ({ classes }: CloseIconProps) => {
  return (
    <CgClose
      className={`hover:rotate-90 hover:text-FB0606 transition-all cursor-pointer ${classes}`}
    ></CgClose>
  );
};

export default CloseIcon;
// absolute left-3 top-2
