import Card from "../components/ui/Card";
import CheckBoxComponent from "../components/ui/CheckBoxComponent";
import Input from "../components/ui/Input";
import AuthLayout from "../layout/AuthLayout";
import Button from "./../components/ui/Button";

const Register = () => {
  return (
    <AuthLayout BtnValue="ورود">
      <Card cardTitle="ثبت نام در کوئرا تسک منیجر">
        <Input
          label="نام کامل"
          name="name"
          id="name"
          type="text"
          autoComplete="name"
          required
        />
        <Input
          label="ایمیل"
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="رمز عبور"
          name="password"
          id="password"
          type="password"
          autoComplete="password"
          required
        />
        <CheckBoxComponent
          id="acceptRules"
          label="قوانین و مقررات را میپذیرم"
        />
        <Button value="ثبت نام" />
      </Card>
    </AuthLayout>
  );
};

export default Register;
