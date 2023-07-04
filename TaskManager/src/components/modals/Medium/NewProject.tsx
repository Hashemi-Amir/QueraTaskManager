import Input from "../../ui/Input";
import Button from "../../ui/Button";
import CloseIcon from "../../ui/Close";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { createProject, toggleMediumModal } from "../../../services/app/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type projectProps = {
  id?: string;
};

const NewProject = ({ id }: projectProps) => {
  const dispatch = useAppDispatch();
  const { isLoadingPost } = useAppSelector((state) => state.projects);

  const handleNewProject = () => {
    const name = document.querySelector<HTMLInputElement>("#newProject")?.value;
    const formData: (string | undefined | undefined)[] = [name, id];
    if (name?.trim()) {
      dispatch(createProject(formData));
    } else {
      toast.warning("نام پروژه را وارد کنید", { rtl: true });
    }
  };

  return (
    <div className="modal-box w-3/4 max-w-lgl min-w-[500px] dark:bg-[#15202B]">
      <div className="p-5 rounded-lg">
        {/* card header */}
        <div className="w-full flex justify-between items-center">
          <label
            htmlFor="my-modal-3"
            className="text-323232 cursor-pointer dark:text-[#F7F9F9]"
            onClick={() => dispatch(toggleMediumModal(""))}
          >
            <CloseIcon />
          </label>

          <div className="font-semibold text-2xl text-black dark:text-[#F7F9F9]">
            ساختن پروژه جدید
          </div>

          <span></span>
        </div>

        {/* card content */}
        {isLoadingPost ? (
          <AiOutlineLoading3Quarters
            size="2.8rem"
            className="m-auto mt-3 animate-spin text-208D8E dark:text-[#F1B127]"
          />
        ) : (
          <div className="mt-11 w-full">
            <Input label="نام پروژه" type="text" id="newProject"/>

            {/* Button  */}
            <div className="mt-16">
              <Button
                disabled={isLoadingPost}
                value="ساختن پروژه جدید"
                onClick={handleNewProject}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProject;
