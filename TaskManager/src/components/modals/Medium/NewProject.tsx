import Input from "../../ui/Input";
import Button from "../../ui/Button";
import CloseIcon from "../../ui/Close";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import { createProject } from "../../../services/app/store";


type projectProps = {
  handleAllSideMoreModals: (modalName:string) => void;
  id? : string,
  handleItemClick : () => void
};

const NewProject = ({ handleAllSideMoreModals , id ,handleItemClick}: projectProps) => {

  const dispatch = useAppDispatch();
  const {isLoadingPost} = useAppSelector(state => state.projects)
  


  const handleNewProject = () => {
    const name = document.querySelector<HTMLInputElement>('#newProject')?.value
    const formData:(string | undefined  | undefined)[] = [name , id]
    if(name?.trim()){
     dispatch(createProject(formData))
     handleAllSideMoreModals('')
      handleItemClick()
    }
    
  }

  return (
    <div className="modal-box w-3/4 max-w-lgl">
      <div className="p-5 bg-white rounded-lg">
        {/* card header */}
        <div className="w-full flex justify-between items-center">
          <label
            htmlFor="my-modal-3"
            className="text-323232 cursor-pointer"
            onClick={() => handleAllSideMoreModals('')}
          >
            <CloseIcon />
          </label>

          <div className="font-semibold text-2xl text-black">
            ساختن پروژه جدید
          </div>

          <span></span>
        </div>

        {/* card content */}
        <div className="mt-11 w-full">
          <Input
            label="نام پروژه"
            type="text"
            id="newProject"
            
          />

          {/* Button  */}
          <div className="mt-16">
            <Button 
              disabled={isLoadingPost}
              value="ساختن پروژه جدید" 
              onClick={handleNewProject}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
