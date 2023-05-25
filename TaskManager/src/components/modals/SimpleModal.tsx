
const SimpleModal = () => {
    return (
        <>
            <label htmlFor="my-modal" className="btn">open modal</label>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    
                </div>
            </div>
        </>
    );
};

export default SimpleModal;