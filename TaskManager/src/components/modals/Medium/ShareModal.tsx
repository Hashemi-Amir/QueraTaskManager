import Button from "../../ui/Button";
import { FiLink } from "react-icons/fi";
import avatar from "../../../assets/avatar.png";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "../../ui/Close";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../services/app/hook";
import {
  addMemberToProject,
  addWorkSpaceMember,
  fetchAddedMember,
  fetchAddedMemberWorkspace,
  removeMemberThanProject,
  removeWorkSpaceMember,
  toggleMediumModal,
} from "../../../services/app/store";
import { BsTrash } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Members = {
  user: {
    _id: string;
    email: string;
  };
};
type ShareModalProps = {
  ModalTitle: string;
  id?: string;
};

const ShareModal = ({ ModalTitle, id }: ShareModalProps) => {
  const [members, setMembers] = useState<Members[]>([]);
  const inputInvite = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const {
    workSpaces: workMembers,
    isSuccessPost,
    isLoadingPost,
    addedMemberUserName: addedMemberWorkspace,
  } = useAppSelector((state) => state.workSpaces);
  const {
    isSuccessPost: isSuccessProject,
    isLoadingPost: isLoadingProject,
    workSpaces,
    addedMemberUserName,
  } = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (inputInvite.current?.value && isSuccessPost) {
      dispatch(fetchAddedMemberWorkspace(addedMemberWorkspace));
      inputInvite.current.value = "";
    }

    if (inputInvite.current?.value && isSuccessProject) {
      dispatch(fetchAddedMember(addedMemberUserName));
      inputInvite.current.value = "";
    }

    handleMembers();
  }, [
    dispatch,
    workMembers,
    isSuccessPost,
    isSuccessProject,
    fetchAddedMember,
    workSpaces,
  ]);

  // check has member
  const checkHasMember = (memberName: string) => {
    if (ModalTitle === "ورک اسپیس") {
      const workspaceIndex = workMembers.findIndex(
        (workspace) => workspace._id === id
      );
      const hasMember = workMembers[workspaceIndex].members.some(
        (member) => member.user.username === memberName
      );
      return hasMember;
    }
    if (ModalTitle === "پروژه") {
      const project = workSpaces.map((workSpace) =>
        workSpace.projects.find((project) => project._id === id)
      );
      project.some((project) => project?.members);
      const hasMember = project[0]?.members.some(
        (member) => member.user.username === memberName
      );
      return hasMember;
    }
  };

  // handle and setMembers for map
  const handleMembers = () => {
    if (ModalTitle === "ورک اسپیس") {
      const filter = workMembers.filter((item) => item._id === id);
      if (filter.length > 0) {
        const membersArray: Members[] = (filter[0] as any).members;
        setMembers(membersArray);
      }
    }

    if (ModalTitle === "پروژه") {
      const projects = workSpaces.map((workSpace) => workSpace.projects);
      const selectedProject: any = [];
      projects.forEach((project) => {
        project.forEach(
          (item) => item._id === id && selectedProject.push(project)
        );
      });

      if (selectedProject.length > 0) {
        const projectMembers = selectedProject[0].find(
          (project: { _id: string | undefined }) => project._id === id
        );

        setMembers(projectMembers.members);
      }
    }
  };

  // Add member with called dispatch redux toolkit
  const handleAddMember = () => {
    const inviteValue = inputInvite.current?.value;
    if (ModalTitle === "ورک اسپیس" && inviteValue?.trim()) {
      const workspaceIds: (string | undefined)[] = [id, inviteValue];
      checkHasMember(inviteValue)
        ? toast.error(`کاربر ${inviteValue} از قبل اضافه شده !`, { rtl: true })
        : dispatch(addWorkSpaceMember(workspaceIds));
    }

    if (ModalTitle === "پروژه" && inviteValue?.trim()) {
      const projectsIds: (string | undefined)[] = [id, inviteValue];

      checkHasMember(inviteValue)
        ? toast.error(`کاربر ${inviteValue} از قبل اضافه شده !`, { rtl: true })
        : dispatch(addMemberToProject(projectsIds));
    }
  };

  // Remove member with called dispatch redux toolkit
  const handleRemoveMember = (selectedMemberId: string) => {
    if (ModalTitle === "ورک اسپیس") {
      const workspaceIds = [id, selectedMemberId];
      inputInvite.current?.value && (inputInvite.current.value = "");
      dispatch(removeWorkSpaceMember(workspaceIds));
    }
    if (ModalTitle === "پروژه") {
      const projectsIds: (string | undefined)[] = [id, selectedMemberId];
      inputInvite.current?.value && (inputInvite.current.value = "");
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
            onClick={() => dispatch(toggleMediumModal(""))}
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
                ref={inputInvite}
                className="w-4/5 h-10 p-3 bg-F0F1F3 rounded-tr-lg rounded-br-lg text-sm font-normal focus:outline-none"
              />

              <div className="w-24">
                <Button
                  value="ارسال"
                  className="rounded-tr-none rounded-br-none focus:outline-none"
                  onClick={handleAddMember}
                  disabled={isLoadingPost || isLoadingProject}
                />
              </div>
            </div>

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
            {isLoadingPost || isLoadingProject ? (
              <AiOutlineLoading3Quarters
                size="2.8rem"
                color="208D8E"
                className="m-auto animate-spin"
              />
            ) : (
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
                      <li key={item.user._id} className="w-full mt-5">
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
                            onClick={() => {
                              handleRemoveMember(item.user._id);
                            }}
                          >
                            <span className="ml-4">حذف ممبر</span>
                            <BsTrash />
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShareModal;
