import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import AuthLayout from "../layout/AuthLayout";

const ForgetPassword = () => {
  return (
    <AuthLayout BtnValue="ورود">
      <Card cardTitle="فراموشی رمز عبور">
        <Input label="ایمیل خود را وارد کنید" />
        <Button value="دریافت ایمیل بازیابی رمز عبور" />
      </Card>
    </AuthLayout>
  );
};

export default ForgetPassword;
