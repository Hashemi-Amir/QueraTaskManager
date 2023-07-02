import { createPortal } from "react-dom";
import { HiOutlineShare } from "react-icons/hi";
import Modal from "../../layout/Modal";
import ShareModal from "../modals/Medium/ShareModal";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import CloseIcon from "./Close";
import { toggleMediumModal } from "../../services/app/store";

const Share = () => {
  const [projectId, setProjectId] = useState("");
  const { selectedProjectSidebar, workSpaces } = useAppSelector(
    (state) => state.projects
  );
  const { medium } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();
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
          dispatch(toggleMediumModal("shareModalHeader"));
        }}
      >
        <HiOutlineShare size="24" color="#BDBDBD" />
        <span className="text-base font-dana font-medium text-1E1E1E dark:text-[#F7F9F9]">
          اشتراک گذاری
        </span>
      </div>

      {medium === "shareModalHeader" &&
        createPortal(
          <Modal>
            {selectedProjectSidebar != "" ? (
              <ShareModal ModalTitle="پروژه" id={projectId} />
            ) : (
              <div className="modal-box w-[500px] dark:bg-[#15202B]">
                <div className="w-full flex justify-between items-center ">
                  <label
                    htmlFor="my-modal-3"
                    className="text-323232 cursor-pointer dark:text-[#F7F9F9]"
                    onClick={() => dispatch(toggleMediumModal(""))}
                  >
                    <CloseIcon />
                  </label>

                  <div className="font-semibold text-2xl text-black"></div>

                  <span></span>
                </div>
                <div className="font-semibold text-xl text-black text-center dark:text-[#F7F9F9]">
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
