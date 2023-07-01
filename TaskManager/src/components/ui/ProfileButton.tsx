import { useAppSelector } from "../../services/app/hook";

type ProfileButtonProps = {
  userName?: string;
  className?: string;
};
const ProfileButton = ({ userName, className }: ProfileButtonProps) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <button className="flex items-center w-fit gap-2 ">
      <span
        className={`flex justify-center items-center rounded-full bg-yellow-300 dark:text-[#1E2124] ${className}`}
      >
        {user?.username.slice(0, 2)}
      </span>
      {userName}
    </button>
  );
};

export default ProfileButton;
