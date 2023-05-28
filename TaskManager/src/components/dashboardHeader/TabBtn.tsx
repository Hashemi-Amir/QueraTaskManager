type TabBtnProps = {
  title: string;
  icon: React.ReactNode;
};
const TabBtn = ({ title, icon }: TabBtnProps) => {
  return (
    <button className="px-4 flex items-center justify-center gap-2 font-medium text-323232 border-l-2 border-l-999999">
      {icon}
      {title}
    </button>
  );
};

export default TabBtn;
