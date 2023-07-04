import Button from "../../components/ui/Button";
import avatar from "../../assets/avatar.jpg";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export type FieldValues = Record<string, unknown>;
import Schema from "../../components/validationRuls/Schema";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { toast } from "react-toastify";
import { updateUserById, resetUser } from "../../services/app/store";

const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(Schema.personalInfo),
  });

  const dispatch = useAppDispatch();
  const { isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.dismiss();
      toast.error(`${message}`);
      dispatch(resetUser());
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success(`اطلاعات شما با موفقیت تغییر کرد`, {
        autoClose: 1000,
        rtl: true,
      });
      dispatch(resetUser());
      reset();
    }
  }, [isSuccess, isError, message, isLoading, dispatch, reset]);

  const onSubmit = (data: FieldValues) => {
    dispatch(
      updateUserById({
        firstname: data.firstName,
        lastname: data.lastName,
        email: typeof data.email === "string" && data.email.toLowerCase(),
      })
    );
  };

  const errorMsgStyle = "text-FC0733 text-xs absolute py-1";
  const errorInputStyle = "border-FB0606";

  return (
    <div className="w-96  mr-14 dark:text-[#F7F9F9]">
      <h3 className="text-1E1E1E text-2xl font-bold mb-9 dark:text-inherit">
        اطلاعات فردی
      </h3>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* User Prof img */}
          <div className="flex mb-6 gap-4">
            <span className="w-24 h-24 grid place-content-center overflow-hidden  text-4xl rounded-full bg-EAF562">
              <img draggable={false} src={avatar} alt="" />
            </span>
            <div className="flex flex-col justify-center gap-3 ">
              <label
                className=" border border-208D8E rounded-lg p-2 cursor-pointer grid place-content-center text-xl text-208D8E dark:border-[#F1B127] dark:text-[#F1B127]"
                htmlFor="img"
              >
                ویرایش تصویر پروفایل
              </label>
              <input hidden type="file" id="img" />
              <span className="text-xs text-8A8989">
                این تصویر برای عموم قابل نمایش است.
              </span>
            </div>
          </div>

          {/* User Credentials */}
          <div className="mb-9">
            <Input
              label="نام"
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="name"
              className={errors.firstName?.message && errorInputStyle}
              register={register}
            />
            <p className={errorMsgStyle}>{errors.firstName?.message}</p>
            <Input
              label="نام خانوادگی"
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="name"
              className={errors.lastName?.message && errorInputStyle}
              register={register}
            />
            <p className={errorMsgStyle}>{errors.lastName?.message}</p>

            <Input
              label="ایمیل"
              type="tel"
              id="email"
              name="email"
              autoComplete="email"
              className={errors.email?.message && errorInputStyle}
              dir="auto"
              register={register}
            />
            <p className={errorMsgStyle}>{errors.email?.message}</p>
          </div>

          <div className=" relative">
            <Button
              disabled={isLoading}
              type="submit"
              value={`${isLoading ? "" : "ثبت تغییرات"}`}
            ></Button>
            {isLoading && (
              <span className=" loading loading-dots loading-lg absolute left-[45%] -bottom-0 text-white"></span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
