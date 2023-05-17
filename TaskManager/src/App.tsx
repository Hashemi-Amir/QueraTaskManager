import "./App.css";
import Button from "./components/ui/Button";
import Card from "./components/ui/Cart";
import CheckBoxComponent from "./components/ui/CheckBoxComponent";
import Input from "./components/ui/Input";
import AuthLayout from "./layout/AuthLayout";

function App() {
  return (
    <AuthLayout>
      <Card>
        <Input
          label="نام"
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
        />
          <Input
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          dir="ltr"
        />
        <Input
          label="رمز عبور"
          type="password"
          id="password"
          name="password"
          autoComplete="password"
          required
        />
      
        <CheckBoxComponent
          id={"checkbox"}
          label="قوانین و مقررات را می‌پذیرم."
        />
        <Button value="ورود" />
      </Card>
    </AuthLayout>
  );
}

export default App;
