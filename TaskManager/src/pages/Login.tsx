import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "./../components/ui/Button";
import { schema } from "../components/Validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export type FieldValues = Record<string, unknown>;

const Login = () => {
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
            className="text-208D8E font-semibold text-xs md:text-sm"
          >
            رمز عبور را فراموش کرده‌ای؟
          </Link>
        </div>

        <Button value="ورود" />
        <div className="text-center text-base mt-5">
          <span>ثبت نام نکرده‌ای؟</span>
          <Link to={"/register"} className="font-bold text-208D8E mr-2">
            ثبت نام
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Login;
