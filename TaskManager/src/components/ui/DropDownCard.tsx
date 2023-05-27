
type DropDownCardProps = {
    children : React.ReactNode
}

const DropDownCard = ({children}:DropDownCardProps) => {
    return (
        <div className="dropdown relative">
            
            <ul tabIndex={0} className="dropdown-content menu p-2 absolute shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </div>
    );
};

export default DropDownCard;