type CardProps = { children: React.ReactNode; cardTitle: string };

const Card = ({ children, cardTitle }: CardProps) => {
  return (
    <div className="flex flex-col items-center p-6 gap-7 absolute bg-white rounded-2xl shadow-[0px_12px_50px_rgba(0,0,0,0.18)]">
      <div className="not-italic font-semibold text-3xl  text-right text-black">
        {cardTitle}
      </div>
      <div className="w-full flex flex-col p-0 gap-5">{children}</div>
    </div>
  );
};

export default Card;
