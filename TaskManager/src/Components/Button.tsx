
type ButtonProps = {
    value: string;
};
  
const Button = (props: ButtonProps) => {
const style =
    "w-full h-10 p-2.5 gap-2.5 border-2 border-transparent text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md bg-green-15 transition hover:bg-transparent hover:border-2 hover:border-green-15 hover:text-green-15 duration-700";
return <button className={style}>{props.value}</button>;
};
  
export default Button;