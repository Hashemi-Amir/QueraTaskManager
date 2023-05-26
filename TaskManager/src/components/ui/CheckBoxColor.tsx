
type CheckBoxColorProps = {
    id : any,
    className?: string,
} 

const CheckBoxColor = ({id , className}:CheckBoxColorProps) => {
    
    return (
        <li 
            className={`h-4 w-4 mr-3 rounded-sm hover:cursor-pointer ${className}`}
            id={id}
        ></li>

    );
};

export default CheckBoxColor;