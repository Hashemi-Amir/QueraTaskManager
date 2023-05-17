
type AuthButtonsProps = {
    value : string
}

const AuthButtons = (props : AuthButtonsProps) => {
    let style = 'w-[469px] h-[40px] p-[10px] gap-[10px] text-sm font-bold leading-4 flex justify-center items-center text-white rounded-md bg-[#208D8E] '
    return (
        <button className={style}>
            {props.value}
        </button>
    );
};

export default AuthButtons;