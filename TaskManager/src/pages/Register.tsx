import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import CheckBox from "../components/ui/CheckBox";
import Input from "../components/ui/Input";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export type FieldValues = Record<string, unknown>;
import { schema } from "../components/Validation";

const Register = () => {

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
    <AuthLayout BtnValue="ورود">
      <Card cardTitle="ثبت‌نام در کوئرا تسک منیجر " className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="نام کامل"
            type="text"
            id="fullName"
            name="fullName"
            autoComplete="name"
            className={errors.fullName?.message && errorInputStyle}
            register={register}
          />
          <p className={errorMsgStyle}>{errors.fullName?.message}</p>
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
            type="Password"
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
          <Button value="ثبت نام" />
        </form>
      </Card>
    </AuthLayout>
  );
};

export default Register;
