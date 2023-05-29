import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { schema } from "../components/Validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export type FieldValues = Record<string, unknown>;

const Forget = () => {
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

  const Navigate = useNavigate();
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
        <Button
          onClick={() => Navigate("/reset")}
          value="دریافت ایمیل بازیابی رمز عبور"
        />
      </form>
    </Card>
  );
};

export default Forget;
