import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import AuthLayout from "../layout/AuthLayout";

const Forget = () => {
  const Navigate = useNavigate();
  return (
    <AuthLayout BtnValue="ورود">
      <Card cardTitle="فراموشی رمز عبور">
        <Input label="ایمیل خود را وارد کنید" />
        <Button
          onClick={() => Navigate("/reset")}
          value="دریافت ایمیل بازیابی رمز عبور"
        />
      </Card>
    </AuthLayout>
  );
};

export default Forget;
