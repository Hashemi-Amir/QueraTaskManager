import Button from "../../ui/Button";
import { FiLink } from "react-icons/fi";
import avatar from "../../../assets/avatar.png";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import Permission from "../Small/Permission";
import CloseIcon from "../../ui/Close";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import {
  addMemberToProject,
  addWorkSpaceMember,
  fetchAllWorkSpaces,
  removeMemberThanProject,
  removeWorkSpaceMember,
} from "../../../services/app/store";
import { resetWorkspaces } from "../../../services/features/workSpaceList/workSpacesSlice";

type Members = {
  user: {
    _id: string;
    email: string;
  };
};
type ShareModalProps = {
  ModalTitle: string;
  shareModalHandler: (modalName: string) => void;
  id?: string;
};

const ShareModal = ({ ModalTitle, shareModalHandler, id }: ShareModalProps) => {
  const [permission, setPermission] = useState({
    value: "دسترسی کامل",
    modal: false,
  });

  const [members, setMembers] = useState<Members[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const dispatch = useAppDispatch();

  const { workSpaces: workMembers, isSuccessPost } = useAppSelector(
    (state) => state.workSpaces
  );
  const { isSuccessPost: isSuccessProject, workSpaces } = useAppSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isSuccessPost) {
      dispatch(fetchAllWorkSpaces());
      dispatch(resetWorkspaces());
    }
    if (isSuccessProject) {
      dispatch(fetchAllWorkSpaces());
      dispatch(resetWorkspaces());
    }

    handleMembers();
  }, [dispatch, workMembers, isSuccessPost, isSuccessProject]);

  const handleMembers = () => {
    if (ModalTitle === "ورک اسپیس") {
      const filter = workMembers.filter((item) => item._id === id);
      console.log(filter);

      if (filter[0]?.members) {
        const membersArray: Members[] = (filter[0] as any).members;
        setMembers(membersArray);
      }
    }

    if (ModalTitle === "پروژه") {
      const projects = workMembers.map((workSpace) => workSpace.projects);
      console.log(projects);

      // const selectedProject: any = [];
      // projects.forEach((project) => {
      //   console.log(project);

      //   project.forEach(
      //     (item) => item._id === id && selectedProject.push(project)
      //   );
      // });

      // console.log(selectedProject);

      // if(selectedProject[0]?.members){
      //   const membersArray: Members[] = (selectedProject[0] as any).members;
      //   console.log(membersArray);

      //   setMembers(selectedProject[0])
      // }
    }
  };

  // handle Permission modal
  const handlePermission = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const element = event.target;
    setPermission({
      ...permission,
      value: (element as HTMLDivElement).innerHTML,
      modal: false,
    });
  };

  // Add member with called dispatch redux toolkit
  const handleAddMember = () => {
    const inviteValue: string | undefined =
      document.querySelector<HTMLInputElement>("#invite")?.value;
    if (ModalTitle === "ورک اسپیس" && inviteValue?.trim()) {
      const workspaceIds: (string | undefined)[] = [id, inviteValue];
      dispatch(addWorkSpaceMember(workspaceIds));
    }

    if (ModalTitle === "پروژه" && inviteValue?.trim()) {
      const projectsIds: (string | undefined)[] = [id, inviteValue];
      dispatch(addMemberToProject(projectsIds));
    }
  };

  // Remove member with called dispatch redux toolkit
  const handleRemoveMember = () => {
    if (ModalTitle === "ورک اسپیس") {
      const workspaceIds = [id, selectedMemberId];
      dispatch(removeWorkSpaceMember(workspaceIds));
    }
    if (ModalTitle === "پروژه") {
      const projectsIds: (string | undefined)[] = [id, selectedMemberId];
      dispatch(removeMemberThanProject(projectsIds));
    }
  };

  return (
    <div className="modal-box overflow-visible w-3/4 z-50  min-w-[500px]">
      {/* modal content */}
      <div className="p-5 bg-white rounded-lg">
        {/* card header */}
        <div className="w-full flex justify-between items-center">
          <label
            htmlFor="my-modal-3"
            className="text-323232 cursor-pointer"
            onClick={() => shareModalHandler("")}
          >
            <CloseIcon />
          </label>

          <div className="font-semibold text-2xl text-black">
            {`به اشتراک گذاری ${ModalTitle}`}
          </div>

          <span></span>
        </div>

        {/* card content */}
        <div className="mt-11 w-full">
          <div className="w-full flex flex-col relative">
            {/* Send invite Link  */}
            <div className="flex">
              <input
                type="text"
                placeholder="دعوت با نام کاربری"
                name="invite"
                id="invite"
                className="w-4/5 h-10 p-3 bg-F0F1F3 rounded-tr-lg rounded-br-lg text-sm font-normal focus:outline-none"
              />

              <div className="w-24">
                <Button
                  value="ارسال"
                  className="rounded-tr-none rounded-br-none focus:outline-none"
                  onClick={handleAddMember}
                />
              </div>
            </div>

            {/* Special Link */}
            <div className="w-full mt-7 flex justify-between items-center">
              <div className="flex items-center">
                <FiLink />
                <span className="mr-3 text-sm font-normal text-[#1E1E1E]">
                  لینک خصوصی
                </span>
              </div>

              <div className="w-20 h-6 px-3 py-1 text-xs flex items-center justify-center font-normal text-[#1E1E1E] rounded-md border border-[#E9EBF0] cursor-pointer">
                کپی لینک
              </div>
            </div>

            {/* List of Members */}
            <div className="mt-7 flex flex-col">
              <h4 className="text-sm font-normal text-[#7D828C]">
                اشتراک گزاشته شده با
              </h4>
              <ul>
                <li className="w-full mt-5 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-9 h-9">
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[#1E1E1E] text-sm font-normal mr-2">
                      من
                    </span>
                    <span className="w-28 mr-3 px-2 py-1 rounded-md flex items-center justify-center bg-A5E4F8 font-normal text-xs">
                      workspace owner
                    </span>
                  </div>

                  <div className="w-26 rounded-md py-1 px-2 text-sm flex items-center justify-center font-normal border border-[#E9EBF0]">
                    دسترسی کامل
                  </div>
                </li>
                {members &&
                  members.map((item) => (
                    <li
                      key={item.user._id}
                      onClick={() => setSelectedMemberId(item.user._id)}
                      className="w-full mt-5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-9 h-9 flex justify-center items-center bg-F27474 rounded-full">
                            SR
                          </div>
                          <span className="w-28 mr-7 px-2 py-1 rounded-md flex items-center justify-center font-normal text-sm">
                            {item.user.email}
                          </span>
                        </div>

                        <div
                          className="relative w-26 rounded-md py-1 px-2 text-sm flex items-center justify-center font-normal border border-[#E9EBF0] cursor-pointer"
                          onClick={() =>
                            setPermission({ ...permission, modal: true })
                          }
                        >
                          <span className="ml-4">{permission.value}</span>
                          <IoIosArrowDown />
                        </div>

                        {permission.modal && (
                          <Permission
                            handlePermission={handlePermission}
                            handleRemoveMember={handleRemoveMember}
                          />
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShareModal;
