import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useState } from "react";
import CloseIcon from "../../ui/Close";

type projectProps = {
  handleModalProject: () => void;
};

const NewProject = ({ handleModalProject }: projectProps) => {
  const [projectName, setprojectName] = useState("");

  return (
    <div className="modal-box w-3/4 max-w-lgl">
      <div className="p-5 bg-white rounded-lg">
        {/* card header */}
        <div className="w-full flex justify-between items-center">
          <label
            htmlFor="my-modal-3"
            className="text-323232 cursor-pointer"
            onClick={handleModalProject}
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
            onChange={(e) => setprojectName(e.target.value)}
          />

          {/* Button  */}
          <div className="mt-16">
            <Button value="ساختن پروژه جدید" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
