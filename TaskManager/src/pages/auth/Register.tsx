import Button from "../../components/ui/Button";
import Card from "../../components/auth/Card";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export type FieldValues = Record<string, unknown>;
import Schema from "../../components/validationRuls/Schema";
import CheckBox from "../../components/ui/CheckBox";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  register as registerUser,
  reset,
} from "../../services/features/auth/authSlice";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(Schema.register),
  });

  const errorMsgStyle = "text-FC0733 text-xs absolute py-1";
  const errorInputStyle = "border-FB0606";

  const Navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.dismiss();
      toast.error(`${message}`);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success(`ثبت نام با موفقیت انجام شد 🎉`, {
        autoClose: 1000,
        rtl: true,
      });
      Navigate("/login");
      dispatch(reset());
    }
  }, [isSuccess, isError, message, isLoading, Navigate, dispatch]);

  const onSubmit = ({ username, email, password }: FieldValues) => {
    dispatch(
      registerUser({
        username: typeof username === "string" ? username.toLowerCase() : "",
        email: typeof email === "string" ? email.toLowerCase() : "",
        password,
      })
    );
  };

  return (
    <Card cardTitle="ثبت‌نام در کوئرا تسک منیجر " className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام کاربری"
          type="text"
          id="username"
          name="username"
          autoComplete="name"
          className={errors.username?.message && errorInputStyle}
          register={register}
        />
        <p className={errorMsgStyle}>{errors.username?.message}</p>
        <Input
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          className={errors.email?.message && errorInputStyle}
          dir="ltr"
          register={register}
        />
        <p className={errorMsgStyle}>{errors.email?.message}</p>

        <Input
          label="کلمه عبور"
          type="password"
          id="password"
          name="password"
          autoComplete="password"
          className={errors.password?.message && errorInputStyle}
          dir="auto"
          register={register}
        />
        <p className={errorMsgStyle}>{errors.password?.message}</p>

        <Input
          label="تایید کلمه عبور"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="password"
          className={errors.confirmPassword?.message && errorInputStyle}
          dir="auto"
          register={register}
        />
        <p className={errorMsgStyle}>{errors.confirmPassword?.message}</p>

        <CheckBox
          label="قوانین و مقررات را می‌پذیرم."
          id="checkbox"
          type="checkbox"
          name="checkbox"
          register={register}
          className={errors.checkbox && "text-FC0733"}
        />
        <div className=" relative">
          <Button
            disabled={isLoading}
            value={`${isLoading ? "" : "ثبت نام"}`}
          />
          {isLoading && (
            <span className=" loading loading-dots loading-lg absolute left-[45%] -bottom-0 text-white"></span>
          )}
        </div>
      </form>
    </Card>
  );
};

export default Register;
