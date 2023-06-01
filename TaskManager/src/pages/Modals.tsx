import {createPortal} from 'react-dom'
import Modal from '../layout/Modal';
import ShareModal from '../components/modals/Medium/ShareModal';
// import Filter from '../components/modals/Large/Filter';




const Modals = () => {
    return (
        <div>
            <h2>this is Modal page</h2>
            
            {createPortal(
                <Modal >
                    <ShareModal ModalTitle='به اشتراک گذاری پروژه' /> 
                </Modal>
                ,
                document.body
            )}

        </div>
    );
};

export default Modals;


