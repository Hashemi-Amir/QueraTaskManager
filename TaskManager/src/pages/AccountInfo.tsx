import ProfileLayout from "../layout/ProfileLayout";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export type FieldValues = Record<string, unknown>;
import { schema } from "../components/validationRuls/Validation";
import Button from "../components/ui/Button";

const AccountInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const errorMsgStyle = "text-FC0733 text-xs absolute py-1";
  const errorInputStyle = "border-FB0606";

  return (
    <ProfileLayout>
      <div className="w-96 mr-14">
        <h3 className="text-1E1E1E text-2xl font-bold mb-9">اطلاعات حساب</h3>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {/* User Credentials */}
            <div className="mb-9">
              <Input
                label="ایمیل"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className={errors.email?.message && errorInputStyle}
                register={register}
              />
              <p className={errorMsgStyle}>{errors.email?.message}</p>

              {/* Authentication */}
              <div className="relative">
                <Input
                  label="رمز عبور"
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  className={errors.password?.message && errorInputStyle}
                  register={register}
                />
                <button
                  type="button"
                  className="absolute top-8 left-0 w-24 hover:bg-[#1d7f80] focus:ring-2 focus:ring-teal-300 transition-all h-10 p-2.5 text-sm font-bold leading-4 flex justify-center items-center text-white rounded-l-md bg-208D8E"
                >
                  احراز هویت
                </button>
                <p className={errorMsgStyle}>{errors.password?.message}</p>
              </div>

              <Input
                label="نام کاربری"
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                className={errors.username?.message && errorInputStyle}
                dir="auto"
                register={register}
              />
              <p className={errorMsgStyle}>{errors.username?.message}</p>
            </div>

            <Button value="ثبت تغییرات"></Button>
          </form>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default AccountInfo;
