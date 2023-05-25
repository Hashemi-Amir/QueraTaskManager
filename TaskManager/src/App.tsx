import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Forgot from "./pages/Forgot";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Routes>
      <Route index path="/" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset" element={<Reset />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
