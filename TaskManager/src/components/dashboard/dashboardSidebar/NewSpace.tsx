import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CgAddR } from "react-icons/cg";
import Modal from "../../../layout/Modal";
import NewWorkspace from "../../modals/Medium/NewWorkspace";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { toast } from "react-toastify";
import { fetchProjects, resetPostBoard, resetPostProject, resetPostWorkspace, resetProject, resetTask } from "../../../services/app/store";

const NewSpace = () => {
  const [modalWorkSpace, setModalWorkSpace] = useState(false);
  const [workSpaceStep, setWorkSpaceStepe] = useState("ساختن ورک اسپیس جدید");

  const dispatch = useAppDispatch();
  const { isErrorPost, isLoadingPost, isSuccessPost, messagePost , selectedWorkSpaceId } =
    useAppSelector((state) => state.workSpaces);
  const {
    isErrorPost: isErrorProject,
    isLoadingPost: isLoadingPorject,
    isSuccessPost: isSuccessProject,
    messagePost: messageProject,
    
  } = useAppSelector((state) => state.projects);
  const {
    isErrorPost : isErrorBoard,
    isLoadingPost : isLoadingBoard,
    isSuccessPost : isSuccessBoard,
    messagePost : messageBoard,
  } = useAppSelector((state => state.boards));

  const {
    isError : isErrorTask,
    isLoading : isLoadingTask,
    isSuccess : isSuccessTask,
    message : messageTask,
  } = useAppSelector((state => state.tasks));
  useEffect(() => {

    // workSpace
    if (isErrorPost && messagePost != "") {
      toast.dismiss();
      toast.error(`${messagePost} ❗`);
      dispatch(resetPostWorkspace());
    }
    if (isSuccessPost && messagePost != "") {
      toast.dismiss();
      toast.success(`${messagePost}`, { rtl: true });
      dispatch(resetPostWorkspace());
    }
    // project
    if (isErrorProject) {
      toast.dismiss();
      toast.error(`${messageProject} ❗`);
      dispatch(resetPostProject());
    }
    if (isSuccessProject && messageProject != "") {
      dispatch(fetchProjects(selectedWorkSpaceId))
      dispatch(resetProject())
      toast.dismiss();
      toast.success(`${messageProject}`, { rtl: true });
      dispatch(resetPostProject());
    }

    // board
    if (isErrorBoard) {
      toast.dismiss();
      toast.error(`${messageBoard} ❗`);
      dispatch(resetPostBoard());
    }
    if (isSuccessBoard && messageBoard != "") {
      toast.dismiss();
      toast.success(`${messageBoard}`, { rtl: true });
      dispatch(resetPostBoard());
    }


    // task
    if (isErrorTask) {
      toast.dismiss();
      toast.error(`${messageTask} ❗`);
      dispatch(resetTask());
    }
    if (isSuccessTask && messageTask != "") {
      toast.dismiss();
      toast.success(`${messageTask}`, { rtl: true });
      dispatch(resetTask());
    }

  }, [
    dispatch,
    isErrorPost,
    isLoadingPost,
    isSuccessPost,
    messagePost,
    isErrorProject,
    isLoadingPorject,
    isSuccessProject,
    messageProject,
    isErrorBoard,
    isLoadingBoard,
    isSuccessBoard,
    messageBoard,
    messageTask,
    isSuccessTask,
    isLoadingTask,
    isErrorTask
  ]);

  
  // new workspaace modal toggle
  const handleModalWorkSpace = () => setModalWorkSpace(!modalWorkSpace);
  return (
    <>
      <button
        disabled={isLoadingPost}
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
