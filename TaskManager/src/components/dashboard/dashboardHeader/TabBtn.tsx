type TabBtnProps = {
  title: string;
  icon: React.ReactNode;
  classes?: string;
} & React.ComponentProps<"button">;
const TabBtn = ({ title, icon, classes }: TabBtnProps) => {
  return (
    <button
      className={`pb-3 px-4 flex items-center justify-center gap-2 outline-none ${classes} `}
    >
      {icon}
      {title}
    </button>
  );
};

export default TabBtn;
