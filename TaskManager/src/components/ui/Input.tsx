import { UseFormRegister } from "react-hook-form";
export type FieldValues = Record<string, unknown>;
type InputProps = {
  label?: string;
  id: string;
  className?: string;
  register?: UseFormRegister<FieldValues>;
} & React.ComponentProps<"input">;

const Input = ({ label, id, register, className, ...rest }: InputProps) => {
  return (
    <div className="mt-6">
      <label
        htmlFor={id}
        className="text-sm font-normal text-black dark:text-[#F7F9F9]"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...rest}
          id={id}
          {...register?.(id)}
          className={`w-full border border-AAAAAA h-10 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-[#1E2124] dark:autofill:shadow-[inset_0_0_0px_1000px_#626466] dark:text-[#F7F9F9]  ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;
