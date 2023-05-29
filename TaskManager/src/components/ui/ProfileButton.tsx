type ProfileButtonProps = {
  userName?: string;
  abbreviation: string;
  className?: string
};
const ProfileButton = ({ userName, abbreviation,className }: ProfileButtonProps) => {
  return (
    <button className="flex items-center gap-2">
      <span className={`flex justify-center items-center rounded-full bg-yellow-300 ${className}`}>
        {abbreviation}
      </span>
      {userName}
    </button>
  );
};

export default ProfileButton;
