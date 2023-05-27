import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Forgot from "./pages/Forgot";
import PageNotFound from "./pages/PageNotFound";
import PersonalInfo from "./pages/PersonalInfo";
import AccountInfo from "./pages/AccountInfo";
import ProfileSettings from "./pages/ProfileSettings";
import TaskInfo from "./components/TaskInformation/TaskInfo";
function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset" element={<Reset />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="personalinfo" element={<PersonalInfo />} />
      <Route path="accountinfo" element={<AccountInfo />} />
      <Route path="profsettings" element={<ProfileSettings />} />
    </Routes>
  );
}

export default App;
