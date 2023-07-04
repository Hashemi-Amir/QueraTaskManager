import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Schema from "../../components/validationRuls/Schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../components/auth/Card";
export type FieldValues = Record<string, unknown>;
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { toast } from "react-toastify";
import {
  login as loginUser,
  reset,
} from "../../services/features/auth/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(Schema.login),
  });

  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.dismiss();
      toast.error(
        `${
          message === "Invalid email/username or password"
            ? "نام کاربری/ایمیل یا رمز عبور نادرست است."
            : message
        } ❗`
      );
      dispatch(reset());
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success(` خوش آمدید 🎉`, { autoClose: 2000, rtl: true });
      dispatch(reset());
    }

    const redirect = searchParams.has("redirect")
      ? searchParams.get("redirect")
      : null;
    if (isSuccess && redirect) {
      Navigate(redirect);
    } else if (isSuccess) {
      Navigate("/listview");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    message,
    Navigate,
    dispatch,
    searchParams,
  ]);

  const onSubmit = (data: FieldValues) => {
    dispatch(
      loginUser({
        emailOrUsername:
        typeof data.email === "string" && data.email.toLowerCase(),
        password: data.password,
      })
    );
  };

  const errorMsgStyle = "text-FC0733 text-xs absolute py-1";
  const errorInputStyle = "border-FB0606";

  return (
    <Card cardTitle="به کوئرا تسک منیجر خوش برگشتی :)">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="ایمیل"
          name="email"
          id="email"
          type="text"
          autoComplete="email"
          className={errors.email?.message && errorInputStyle}
          register={register}
        />
        <p className={errorMsgStyle}>{errors.email?.message}</p>
        <Input
          label="رمز عبور"
          name="password"
          id="password"
          type="password"
          autoComplete="password"
          className={errors.password?.message && errorInputStyle}
          register={register}
        />
        <p className={errorMsgStyle}>{errors.password?.message}</p>

        <div className="mb-7 mt-5">
          <Link
            to={"/forgot"}
            className="text-208D8E font-semibold text-xs md:text-sm dark:text-[#F1B127]"
          >
            رمز عبور را فراموش کرده‌ای؟
          </Link>
        </div>

        <div className="relative">
          <Button
            disabled={isLoading}
            type="submit"
            value={`${isLoading ? "" : "ورود"}`}
          />

          {isLoading && (
            <span className=" loading loading-dots loading-lg absolute left-[46%] bottom-0 text-white"></span>
          )}
        </div>
        <div className="text-center text-base mt-5">
          <span>ثبت نام نکرده‌ای؟</span>
          <Link
            to={"/register"}
            className="font-bold text-208D8E mr-2  dark:text-[#F1B127]"
          >
            ثبت نام
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Login;
