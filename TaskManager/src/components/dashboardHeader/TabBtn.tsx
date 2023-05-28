type TabBtnProps = {
  title: string;
  icon: React.ReactNode;
};
const TabBtn = ({ title, icon }: TabBtnProps) => {
  return (
    <button className="px-4 flex items-center justify-center gap-2 font-medium text-323232 ">
      {icon}
      {title}
    </button>
  );
};

export default TabBtn;
