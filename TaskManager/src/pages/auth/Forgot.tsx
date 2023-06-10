import Button from "../../components/ui/Button";
import Card from "../../components/auth/Card";
import Input from "../../components/ui/Input";
import Schema from "../../components/validationRuls/Schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export type FieldValues = Record<string, unknown>;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  forgot as forgotPass,
  reset,
} from "../../services/features/auth/authSlice";

const Forget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(Schema.forgot),
  });

  // Redux Toolkit codes
  const Navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.dismiss();
      toast.error(message as string);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success(`ایمیل خود را بررسی کنید 🎉`, {
        rtl: true,
      });
      Navigate("/reset");
      dispatch(reset());
    }
    isLoading &&
      toast("لطفا صبر کنید ⏳", {
        rtl: true,
      });
  }, [isSuccess, isError, message, isLoading, Navigate, dispatch]);

  const onSubmit = (data: FieldValues) => {
    dispatch(
      forgotPass({
        email: data.email,
      })
    );
  };

  const errorMsgStyle = "text-FC0733 text-xs absolute py-1";
  const errorInputStyle = "border-FB0606";

  return (
    <Card
      cardTitle="فراموشی رمز عبور"
      className=" w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7">
          <Input
            label="ایمیل خود را وارد کنید"
            id="email"
            type="email"
            autoComplete="email"
            className={errors.email?.message && errorInputStyle}
            register={register}
          />
          <p className={errorMsgStyle}>{errors.email?.message}</p>
        </div>
        <Button disabled={isLoading} value="دریافت ایمیل بازیابی رمز عبور" />
      </form>
    </Card>
  );
};

export default Forget;
