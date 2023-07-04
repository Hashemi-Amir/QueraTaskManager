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
import { ToastContainer } from "react-toastify";
import Protected from "./routes/Protected";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./pages/PageNotFound";
import { useAppDispatch, useAppSelector } from "./services/app/hook";
import { useEffect } from "react";
import { setTheme } from "./services/features/user/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.user);
  useEffect(() => {
    const htmlTag = document.querySelector("html");
    const isDarkSet = localStorage.theme === "dark";
    const isThemeStored = "theme" in localStorage;
    const isDarkPrefered = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const themeStatus =
      isDarkSet || (!isThemeStored && isDarkPrefered) ? "dark" : "light";
    htmlTag?.classList.toggle("dark", themeStatus === "dark");
    localStorage.setItem("theme", themeStatus);
    dispatch(setTheme(themeStatus));
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route
            path="/columnview"
            element={
              <Protected path={"/columnview"}>
                <ColumnView />
              </Protected>
            }
          />
          <Route
            path="/calendarview"
            element={
              <Protected path="/calendarview">
                <Calendar />
              </Protected>
            }
          />
          <Route
            path="/listview"
            element={
              <Protected path="/listview">
                <ListView />
              </Protected>
            }
          />
          <Route
            path="/"
            element={
              <Protected path="/">
                <ListView />
              </Protected>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/Forgot" element={<Forgot />} />
        </Route>
        <Route element={<ProfileLayout />}>
          <Route
            path="/personalinfo"
            element={
              <Protected path="/personalinfo">
                <PersonalInfo />
              </Protected>
            }
          />
          <Route
            path="/accountinfo"
            element={
              <Protected path="/accountinfo">
                <AccountInfo />
              </Protected>
            }
          />
          <Route
            path="/profsettings"
            element={
              <Protected path="/profsettings">
                <ProfileSettings />
              </Protected>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <ToastContainer
        toastStyle={{ backgroundColor: `${theme === "dark" && "#15202b"}` }}
        theme={`${theme === "dark" ? "dark" : "colored"}`}
      />
    </>
  );
}

export default App;
