import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Forgot from "./pages/Forgot";
import PersonalInfo from "./pages/PersonalInfo";
import AccountInfo from "./pages/AccountInfo";
import ProfileSettings from "./pages/ProfileSettings";
import ColumnView from "./pages/ColumnView";
import Calendar from "./components/dashboardCalendar/Calendar";
import ListView from "./components/ui/ListView";
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

// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Reset from "./pages/Reset";
// import Forgot from "./pages/Forgot";
// import PageNotFound from "./pages/PageNotFound";
// import PersonalInfo from "./pages/PersonalInfo";
// import AccountInfo from "./pages/AccountInfo";
// import ProfileSettings from "./pages/ProfileSettings";
// import ColumnView from "./pages/ColumnView";
// import Calendar from "./components/dashboardCalendar/Calendar";
// import ListView from "./components/ui/ListView";
// function App() {
//   return (
//     <Routes>
//       <Route index path="/" element={<ColumnView />} />
//       <Route path="login" element={<Login />} />
//       <Route path="register" element={<Register />} />
//       <Route path="reset" element={<Reset />} />
//       <Route path="forgot" element={<Forgot />} />
//       <Route index path="columnview" element={<ColumnView />} />
//       <Route path="calendarview" element={<Calendar />} />
//       <Route path="listview" element={<ListView />} />
//       <Route path="*" element={<PageNotFound />} />
//       <Route path="personalinfo" element={<PersonalInfo />} />
//       <Route path="accountinfo" element={<AccountInfo />} />
//       <Route path="profsettings" element={<ProfileSettings />} />
//     </Routes>
//   );
// }

// export default App;

// !**********************************************************************************!

// import { Route, Link, Outlet, Routes } from "react-router-dom";

// const Layout1 = () => {
//   return (
//     <div>
//       <header>Layout 1 Header</header>
//       <nav>
//         <Link to="/">Home</Link> <Link to="/about">About</Link>{" "}
//         <Link to="/contact">Contact</Link>
//       </nav>

//       {/* The Outlet component renders any nested child routes */}
//       <Outlet />

//       <footer>Layout 1 Footer</footer>
//     </div>
//   );
// };

// const Layout2 = () => {
//   return (
//     <div>
//       <header>Layout 2 Header</header>
//       <nav>
//         <Link to="/">Home</Link> <Link to="/contact">Contact</Link>
//       </nav>

//       {/* The Outlet component renders any nested child routes */}
//       <Outlet />

//       <footer>Layout 2 Footer</footer>
//     </div>
//   );
// };

// const Home = () => {
//   return <h2>Home page</h2>;
// };

// const About = () => {
//   return <h2>About page</h2>;
// };

// const Contact = () => {
//   return <h2>Contact page</h2>;
// };

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout1 />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//       </Route>
//       <Route path="/contact" element={<Layout2 />}>
//         <Route index element={<Contact />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
