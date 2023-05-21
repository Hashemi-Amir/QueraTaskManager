type ButtonProps = {
  value: string;
} & React.ComponentProps<"button">;

const Button = ({ value, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className="w-full h-10 p-2.5 text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md bg-208D8E"
    >
      {value}
    </button>
  );
};

export default Button;
