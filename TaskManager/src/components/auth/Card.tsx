type CardProps = {
  children: React.ReactNode;
  cardTitle: string;
  className?: string;
};

const Card = ({ children, cardTitle, className }: CardProps) => {
  return (
    <div
      className={`flex flex-col items-center p-7 absolute bg-white rounded-2xl z-10 shadow-[0px_12px_50px_rgba(0,0,0,0.18)]  dark:bg-[#15202B] dark:text-[#F7F9F9] ${className}`}
    >
      <div className="not-italic font-semibold text-3xl text-right text-black dark:text-inherit">
        {cardTitle}
      </div>
      <div className="w-full flex flex-col p-0">{children}</div>
    </div>
  );
};

export default Card;
