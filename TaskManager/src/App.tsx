import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Forgot from "./pages/auth/Forgot";
import PersonalInfo from "./pages/profile/PersonalInfo";
import AccountInfo from "./pages/profile/AccountInfo";
import ProfileSettings from "./pages/profile/ProfileSettings";
import Calendar from "./pages/dashboard/Calendar";
import ListView from "./pages/dashboard/ListView";
import ColumnView from "./pages/dashboard/ColumnView";
import DashboardLayout from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";
import ProfileLayout from "./layout/ProfileLayout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="columnview" element={<ColumnView />} />
        <Route path="calendarview" element={<Calendar />} />
        <Route path="listview" element={<ListView />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/Forgot" element={<Forgot />} />
      </Route>
      <Route path="/" element={<ProfileLayout />}>
        <Route path="personalinfo" element={<PersonalInfo />} />
        <Route path="/accountinfo" element={<AccountInfo />} />
        <Route path="/profsettings" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
