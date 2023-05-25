
type CardMediumProps = {
    children : React.ReactNode;
    cardTitle : string
}

const CardMedium = ({children ,cardTitle }:CardMediumProps) => {
    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="my-modal-3" className="btn">open modal</label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />

            {/* modal content */}
            <div className="p-5 bg-white rounded-lg">
                {/* card header */}
                <div className="w-full flex justify-between items-center">

                    
                    <label htmlFor="my-modal-3" className="text-323232">✕</label>
                    
                    <div className="font-semibold text-2xl text-black">
                        {cardTitle}
                    </div>
                    {/* back page */}
                    <div></div>

                </div>
                {/* card content */}
                <div className="mt-11 w-full">
                    {children}
                </div>
            </div>

        </>


    );
};

export default CardMedium;