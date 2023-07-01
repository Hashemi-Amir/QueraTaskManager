import { createPortal } from "react-dom";
import { HiOutlineShare } from "react-icons/hi";
import Modal from "../../layout/Modal";
import ShareModal from "../modals/Medium/ShareModal";
import { useState } from "react";
import { useAppSelector } from "../../services/app/hook";
import CloseIcon from "./Close";

const Share = () => {
  const [shareModal, setShareModal] = useState(false);
  const [projectId, setProjectId] = useState("");
  const shareModalHandler = () => setShareModal(!shareModal);
  const { selectedProjectSidebar, workSpaces } = useAppSelector(
    (state) => state.projects
  );
  const findProjectId = () => {
    const workSpaceId: any = [];
    workSpaces.forEach((workSpace, indx) => {
      return workSpace.projects.forEach(
        (project) =>
          project.name === selectedProjectSidebar && workSpaceId.push(indx)
      );
    });
    const [index] = workSpaceId;
    if (index != undefined) {
      const project = workSpaces[index].projects.find(
        (project) => project.name === selectedProjectSidebar
      );

      project?._id && setProjectId(project?._id);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center gap-1 "
        role="button"
        onClick={() => {
          findProjectId();
          shareModalHandler();
        }}
      >
        <HiOutlineShare size="24" color="#BDBDBD" />
        <span className="text-base font-dana font-medium text-1E1E1E">
          اشتراک گذاری
        </span>
      </div>

      {shareModal &&
        createPortal(
          <Modal>
            {selectedProjectSidebar != "" ? (
              <ShareModal
                ModalTitle="پروژه"
                shareModalHandler={shareModalHandler}
                id={projectId}
              />
            ) : (
              <div className="modal-box">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="my-modal-3"
                    className="text-323232 cursor-pointer"
                    onClick={shareModalHandler}
                  >
                    <CloseIcon />
                  </label>

                  <div className="font-semibold text-2xl text-black"></div>

                  <span></span>
                </div>
                <div className="font-semibold text-xl text-black text-center">
                  پروژه ای انتخاب نشده ، یکی انتخاب کن
                </div>
              </div>
            )}
          </Modal>,
          document.body
        )}
    </>
  );
};

export default Share;
