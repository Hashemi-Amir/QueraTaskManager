import Button from "../../components/ui/Button";
import Card from "../../components/auth/Card";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export type FieldValues = Record<string, unknown>;
import { schema } from "../../components/validationRuls/Validation";
import CheckBox from "../../components/ui/CheckBox";
import axios from "axios";
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

  //////////////////////////////////////////////////////////////////////////

  const article = {
    "emailOrUsername": "amir.nili0972@gmail.com",
    "password": "password123"
  };

  axios
    .post("http://localhost:3000/api/auth/login", article)
    .then((response) => console.log(response))
    .catch((error) => {
      console.error("There was an error!", error.message);
    });

  //////////////////////////////////////////////////////////////////////////
  return (
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
  );
};

export default Register;