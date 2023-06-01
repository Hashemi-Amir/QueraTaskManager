import { useState } from "react";
import { createPortal } from "react-dom";
import { CgAddR } from "react-icons/cg";
import Modal from "../../../layout/Modal";
import NewWorkspace from "../../modals/Medium/NewWorkspace";

const NewSpace = () => {
  const [openModal , setOpenModal] = useState(false)
  const [workSpaceStep , setWorkSpaceStepe] = useState('ساختن ورک اسپیس جدید')
  return (
    <>
      <button className="flex justify-center items-center gap-1 py-3 rounded-md bg-D3D3D3 text-xs font-semibold hover:bg-gradient-to-r from-118C80 to-4AB7D8" onClick={()=>setOpenModal(true)}>
        <CgAddR className="w-4 h-4" />
        ساختن اسپیس جدید
      </button>

      {openModal && createPortal(
        <Modal >
          <NewWorkspace workSpaceStep={workSpaceStep} setWorkSpaceStepe={setWorkSpaceStepe} setOpenModal={setOpenModal} />, 
        </Modal>,
        document.body
      )}
    </>

  );
};

export default NewSpace;
