import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import AuthLayout from "../layout/AuthLayout";
import Button from "./../components/ui/Button";

const Login = () => {
  return (
    <AuthLayout BtnValue="ثبت نام">
      <Card cardTitle="به کوئرا تسک منیجر خوش برگشتی :)">
        <Input
          label="ایمیل"
          name="email"
          id="email"
          type="text"
          autoComplete="email"
          required
        />

        <div>
          <Input
            label="رمز عبور"
            name="password"
            id="password"
            type="password"
            autoComplete="password"
            required
          />
          <a className="text-green-15 font-semibold text-xs md:text-sm ">
            رمز عبور را فراموش کرده ای؟
          </a>
        </div>

        <Button value="ورود" />
        <div className="text-center text-base">
          <span>ثبت نام نکرده ای؟</span>
          <a className="font-bold text-green-15 mr-2">ثبت نام</a>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default Login;
