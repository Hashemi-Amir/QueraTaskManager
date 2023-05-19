type InputProps = { label: string } & React.ComponentProps<"input">;

function Input({ label, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={rest.id} className=" text-sm  font-normal text-black">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...rest}
          className="w-full border border-[#AAAAAA] h-10 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}

export default Input;
