import React from "react";

type ButtonProps = {
  value: string;
  children?: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button">;

const Button = ({ value, children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`${className} hover:bg-[#1d7f80] focus:ring-2 focus:ring-teal-300 transition-all w-full h-10 p-2.5 text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md bg-208D8E `}
    >
      {children}
      {value}
    </button>
  );
};

export default Button;
