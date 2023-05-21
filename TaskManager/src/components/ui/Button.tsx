type ButtonProps = {
  value: string;
} & React.ComponentProps<"button">;

const Button = ({ value, ...rest }: ButtonProps) => {
  const style =
    "w-full h-10 p-2.5 gap-2.5 text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md bg-green-700 ";
  return (
    <button {...rest} className={style}>
      {value}
    </button>
  );
};

export default Button;
