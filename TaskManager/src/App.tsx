import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import { ResetPassword } from "./pages/Reset";
import { Forget } from "./pages/Forget";
function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset" element={<ResetPassword />} />
      <Route path="forget" element={<Forget />} />
    </Routes>
  );
}

export default App;
