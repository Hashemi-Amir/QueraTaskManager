
type ButtonProps = {
    value: string;
};
  
const Button = (props: ButtonProps) => {
const style =
    "w-full h-10 p-2.5 gap-2.5 text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md bg-green-15 ";
return <button className={style}>{props.value}</button>;
};
  
export default Button;