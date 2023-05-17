type CardProps = { children: React.ReactNode };

const Card = (props: CardProps) => {
  const cardStyle = `flex flex-col items-center p-6 gap-7 absolute   
   bg-white rounded-2xl shadow-[0px_12px_50px_rgba(0,0,0,0.18)]`;
  const headerStyle = ` not-italic font-semibold text-3xl leading-[50px] text-right text-black`;
  const formContainerStyle = `w-full flex flex-col items-center p-0 gap-8`;
  const formBodyStyle = `w-full flex flex-col p-0 gap-5`;
  const formFooterStyle = `flex flex-col items-center p-0 gap-5 items-end p-0 gap-2`;

  return (
    <div className={cardStyle}>
      <div className={headerStyle}>به کوئرا تسک منیجر خوش آمدید</div>
      <div className={formContainerStyle}>
        <div className={formBodyStyle}>{props.children}</div>
        <footer className={formFooterStyle}></footer>
      </div>
    </div>
  );
};

export default Card;
