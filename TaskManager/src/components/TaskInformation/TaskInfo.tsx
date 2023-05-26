import TaskInfoCard from "./TaskInfoCard";
import Share from "../ui/Share";
import Watchers from "../ui/Watchers";
import CloseIcon from "../ui/Close";
import DashedBorderCard from "../ui/DashedBorderCard";
import { RiAddBoxLine, RiArrowLeftSLine } from "react-icons/ri";
import { BsCheckSquare } from "react-icons/bs";
import { FiFlag } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { TbTags } from "react-icons/tb";
import { GoPlay } from "react-icons/go";
import Comment from "./Comment";

// Images
import avatar from "../../assets/avatar.jpg";

const TaskInfo = () => {
  return (
    <TaskInfoCard>
      <div className="w-full h-full divide-y divide-F4F4F4 ">
        {/* TaskInfo Header */}
        <section className="w-full  h-1/4 flex divide-x divide-F4F4F4 divide-x-reverse ">
          {/* TaskInfo Header Right */}
          <div className="w-1/2 h-full ml-[1px] relative">
            <div className="w-full  h-14 absolute bottom-6 flex place-content-between items-center px-4">
              {/* Task Info Right */}
              <div className="h-9 flex items-center gap-7">
                {/* Status Changer */}
                <div className="flex rounded-sm hover:shadow-[0px_0px_0px_2px_#F84747] transition-all ">
                  <div
                    role="button"
                    className="w-28 h-8 text-white bg-F84747 flex items-center justify-center"
                  >
                    Open
                  </div>
                  <button className="bg-F84747 mr-[2px] text-white ">
                    <RiArrowLeftSLine size="24"></RiArrowLeftSLine>
                  </button>
                </div>
                {/* Set To Complete */}
                <BsCheckSquare role="button" size="32" color="#BDBDBD" />
                {/* Assign task */}
                <div dir="ltr" className="flex -space-x-2 ">
                  <DashedBorderCard classes="border-C1C1C1">
                    <RiUserAddLine color="#C1C1C1" size="20"></RiUserAddLine>
                  </DashedBorderCard>

                  <div className="w-8 cursor-pointer">
                    <img
                      className="rounded-full"
                      draggable={false}
                      src={avatar}
                    />
                  </div>
                  <div className="w-8 cursor-pointer">
                    <img
                      className="rounded-full"
                      draggable={false}
                      src={avatar}
                    />
                  </div>
                </div>
                {/* Priority Flag */}
                <DashedBorderCard classes="border-FB0606">
                  <FiFlag color="#FB0606" size="20" />
                </DashedBorderCard>
              </div>
              {/* Share */}
              <div>
                <Share />
              </div>
            </div>
          </div>

          {/* TaskInfo Header Left */}
          <div className="w-1/2  h-full relative">
            <div className="w-full h-14 px-4  absolute bottom-6 flex justify-between items-center">
              {/* Task Info Left */}
              <div className="flex h-full items-center divide-x divide-F4F4F4 divide-x-reverse">
                {/* Creation Date */}
                <div className="h-full pl-8">
                  <span className="text-BBBBBB text-xs font-medium">
                    ساخته شده در
                  </span>
                  <p className="text-1E1E1E text-base font-medium">
                    1 اردیبهشت 1402
                  </p>
                </div>
                {/* Timer*/}
                <div className="h-full px-8">
                  <span className="text-BBBBBB text-xs font-medium">زمان</span>
                  <div className="text-1E1E1E text-base font-medium flex  gap-1">
                    <button className="mb-1">
                      <GoPlay size={18} fill="green" />
                    </button>
                    <span className="">00:00:00</span>
                  </div>
                </div>
                {/* Deadline */}
                <div className="h-full pr-7 ml-auto">
                  <span className="text-BBBBBB text-xs font-medium">
                    ددلاین
                  </span>
                  <div className="text-1E1E1E text-base font-medium">فردا</div>
                </div>
              </div>
              {/* Watchers */}
              <div>
                <Watchers />
              </div>
            </div>

            {/* Closing window */}
            <CloseIcon classes={"absolute left-3 top-2 text-BDBDBD"} />
          </div>
        </section>

        {/* ************************************************************ */}

        {/* TaskInfo Body */}
        <section className="w-full h-3/4 flex divide-x divide-F4F4F4 divide-x-reverse">
          {/* TaskInfo Body Right */}
          <div className="w-1/2 box-border overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-white ml-[1px]">
            {/* TaskInfo Body Right Container */}
            <div className="mx-4 my-6 flex flex-col gap-5">
              {/* Tags */}
              <div className="flex items-center justify-start gap-2 ">
                <DashedBorderCard classes="border-C1C1C1">
                  <TbTags size={20} color="#C1C1C1"></TbTags>
                </DashedBorderCard>
                {/* Badges */}
                <div className="flex gap-1 ">
                  <span className="badge-md leading-6 rounded-md bg-blue-600 text-white ">
                    front
                  </span>
                  <span className="badge-md leading-6 rounded-md bg-yellow-600 text-white ">
                    design
                  </span>
                </div>
              </div>
              {/* Task Description */}
              <div>
                <h2 className="font-semibold text-2xl text-1E1E1E mb-3">
                  عنوان تسک
                </h2>
                <textarea
                  name="editTask"
                  id=""
                  placeholder="تسک خود را اینجا ویرایش کنید"
                  className="w-full outline-none resize-none text-black text-base p-4 min-h-[100px] focus:min-h-[200px] rounded-sm hover:ring-[1px] hover:ring-C1C1C1 focus:ring-[1px] focus:ring-C1C1C1 focus:shadow-inner transition-all  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-white scrollbar-corner-transparent"
                ></textarea>
              </div>
              {/* Attachments */}
              <div>
                {/* Add Attachments */}
                <form className="text-208D8E  w-fit cursor-pointer">
                  <label
                    htmlFor="file"
                    className="flex items-center gap-2 font-medium text-xs cursor-pointer"
                  >
                    <RiAddBoxLine size="16" />
                    <span className="pt-0.5">اضافه کردن پیوست</span>
                  </label>
                  <input hidden id="file" type="file" />
                </form>

                {/* Attachments Files */}
              </div>
            </div>
          </div>

          {/* TaskInfo Body Left */}
          <div className="w-1/2 box-border overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-white mb-11">
            {/* TaskInfo Body Left Container */}
            <div className="mx-4 my-6 flex flex-col gap-5 ">
              {/* History of The Task */}
              <ul className="flex flex-col gap-4">
                {/* History Items */}
                <li className="flex items-center justify-between">
                  {/* History Action */}
                  <div className="flex items-center justify-start gap-1">
                    {/* User */}
                    <b className="text-208D8E text-base">شما</b>
                    {/* Action */}
                    <span className="font-normal text-base text-black">
                      این تسک را ساختید
                    </span>
                  </div>
                  {/* History Date */}
                  <span className="text-ACAEB0 font-normal text-xs">
                    1 ساعت پیش
                  </span>
                </li>
                {/* Dummy Actions!  */}
                <li className="flex items-center justify-between">
                  {/* History Action */}
                  <div className="flex items-center justify-start gap-1">
                    {/* User */}
                    <b className="text-208D8E text-base">سعید</b>
                    {/* Action */}
                    <span className="font-normal text-base text-black">
                      این تسک را از ToDo به Done برد
                    </span>
                  </div>
                  {/* History Date */}
                  <span className="text-ACAEB0 font-normal text-xs">
                    1 ساعت پیش
                  </span>
                </li>
              </ul>
              {/* Added Comments */}
              <div className=" flex flex-col gap-2">
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={avatar} />
                    </div>
                  </div>
                  <div className="chat-header flex gap-2 items-center">
                    <span>الی</span>
                    <time className="text-xs opacity-50">12:45</time>
                  </div>
                  <div className="chat-bubble ">
                    طرح‌نما یا لورم ایپسوم به نوشتاری آزمایشی
                  </div>
                </div>

                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={avatar} />
                    </div>
                  </div>
                  <div className="chat-header flex gap-2 items-center">
                    <span>علی</span>
                    <time className="text-xs opacity-50">12:45</time>
                  </div>
                  <div className="chat-bubble before:content-[''] ">
                    طرح‌نما یا لورم ایپسوم به نوشتاری آزمایشی و بی‌معنی در صنعت
                    چاپ، صفحه‌آرایی ویکی‌پدیا
                  </div>
                </div>
              </div>
              {/* Comment Input Component */}
              <Comment></Comment>
            </div>
          </div>
        </section>
      </div>
    </TaskInfoCard>
  );
};

export default TaskInfo;
