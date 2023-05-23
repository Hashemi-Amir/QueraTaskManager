import { UseFormRegister } from "react-hook-form";
export type FieldValues = Record<string, unknown>;
type checkbox = {
  label: string;
  id: string;
  className?: string;
  register: UseFormRegister<FieldValues>;
} & React.ComponentProps<"input">;

const CheckBox = ({ id, label, register, className, ...rest }: checkbox) => {
  return (
    <div className="flex items-center w-full my-7">
      <input
        className="accent-208D8E h-4 w-4 ml-2 border rounded-3xl hover:cursor-pointer"
        {...rest}
        id={id}
        {...register(id)}
      />
      <label htmlFor={id} className={className}>
        {label}
      </label>
    </div>
  );
};
export default CheckBox;
