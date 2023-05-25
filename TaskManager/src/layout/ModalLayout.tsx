
type ModalLayoutProps = {
    children : React.ReactNode 
}

const ModalLayout = ({children}:ModalLayoutProps) => {
    return (
        <div className="modal bg-transparent">
            <div className="modal-box">  
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;