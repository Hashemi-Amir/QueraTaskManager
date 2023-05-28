
type modalProps = {
    children : React.ReactNode,
}


const Modal = ({children}:modalProps) => {
    return (
        <div className="modal opacity-100 visible z-20 pointer-events-auto">
            {children}
        </div>
    );
};

export default Modal;