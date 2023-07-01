import { CgClose } from "react-icons/cg";

interface CloseIconProps {
  classes?: string;
}

const CloseIcon = ({ classes }: CloseIconProps) => {
  return (
    <CgClose
      className={`hover:rotate-90 hover:text-FB0606 transition-all cursor-pointer dark:text-[#F7F9F9] dark:hover:text-FB0606 ${classes}`}
    ></CgClose>
  );
};

export default CloseIcon;
