type ProfileButtonProps = {
  userName: string;
  abbreviation: string;
};
const ProfileButton = ({ userName, abbreviation }: ProfileButtonProps) => {
  return (
    <button className="flex items-center gap-2">
      <span className="rounded-full w-9 h-9 p-2 bg-yellow-300">
        {abbreviation}
      </span>
      {userName}
    </button>
  );
};

export default ProfileButton;
