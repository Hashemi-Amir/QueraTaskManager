import { useState } from "react";
import { createPortal } from "react-dom";
import { CgAddR } from "react-icons/cg";
import Modal from "../../../layout/Modal";
import NewWorkspace from "../../modals/Medium/NewWorkspace";

const NewSpace = () => {
  const [modalWorkSpace, setModalWorkSpace] = useState(false);
  const [workSpaceStep, setWorkSpaceStepe] = useState("ساختن ورک اسپیس جدید");

  // new workspaace modal toggle
  const handleModalWorkSpace = () => setModalWorkSpace(!modalWorkSpace);
  return (
    <>
      <button
        className="flex justify-center items-center gap-1 py-3 rounded-md bg-D3D3D3 text-xs font-semibold hover:bg-gradient-to-r from-118C80 to-4AB7D8"
        onClick={handleModalWorkSpace}
      >
        <CgAddR className="w-4 h-4" />
        ساختن اسپیس جدید
      </button>

      {modalWorkSpace &&
        createPortal(
          <Modal>
            <NewWorkspace
              workSpaceStep={workSpaceStep}
              setWorkSpaceStepe={setWorkSpaceStepe}
              handleModalWorkSpace={handleModalWorkSpace}
            />
            ,
          </Modal>,
          document.body
        )}
    </>
  );
};

export default NewSpace;
