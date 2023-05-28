interface DashedBorderCardProps {
  children: React.ReactNode;
  classes: string;
}

const DashedBorderCard = ({ children, classes }: DashedBorderCardProps) => {
  return (
    <div
      className={` border-[1.5px]  border-dashed rounded-full p-1.5 cursor-pointer ${classes}`}
    >
      {children}
    </div>
  );
};

export default DashedBorderCard;
