import Card from "../components/ui/Card";
import AuthLayout from "../layout/AuthLayout";

const Reset = () => {
  return (
    <AuthLayout BtnValue="ورود">
      <Card cardTitle="فراموشی رمز عبور">
        <p className="text-sm mt-2">
          لینک بازیابی رمز عبور برای شما ایمیل شد. لطفا ایمیل خود را بررسی کنید.
        </p>
      </Card>
    </AuthLayout>
  );
};

export default Reset;
