import {createPortal} from 'react-dom'
import Modal from '../layout/Modal';
import Filter from '../components/modals/Large/Filter';




const Modals = () => {
    return (
        <div>
            <h2>this is Modal page</h2>
            
            {createPortal(
                <Modal >
                    <Filter />
                </Modal>
                ,
                document.body
            )}

        </div>
    );
};

export default Modals;


