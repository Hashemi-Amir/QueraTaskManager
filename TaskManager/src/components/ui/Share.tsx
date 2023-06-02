import { createPortal } from "react-dom";
import { HiOutlineShare } from "react-icons/hi";
import Modal from "../../layout/Modal";
import ShareModal from "../modals/Medium/ShareModal";
import {useState } from "react";

const Share = () => {

  const [shareModal , setShareModal] = useState(false)
  
  const shareModalHandler = () => setShareModal(!shareModal)
  
  
  return (
    <div className="flex items-center justify-center gap-1 " role="button" onClick={shareModalHandler}>
      <HiOutlineShare size="24" color="#BDBDBD" />
      <span className="text-base font-dana font-medium text-1E1E1E">
        اشتراک گذاری
      </span>

      {shareModal && createPortal(
          <Modal >
            <ShareModal ModalTitle="به اشتراک گذاری پروژه" shareModalHandler={shareModalHandler}/>
          </Modal>,
          document.body
        )
      }
    </div>


  );
};

export default Share;
