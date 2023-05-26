import { HiOutlineShare } from "react-icons/hi";

const Share = () => {
  return (
    <div className="flex items-center justify-center gap-1 " role="button">
      <HiOutlineShare size="24" color="#BDBDBD" />
      <span className="text-base font-dana font-medium text-1E1E1E">
        اشتراک گذاری
      </span>
    </div>
  );
};

export default Share;
