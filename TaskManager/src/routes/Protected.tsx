import { Navigate } from "react-router-dom";

const Protected = ({ children, path }: any) => {
  const isLoggedIn = localStorage.getItem("authToken");

  if (!isLoggedIn) {
    return <Navigate to={`/login?redirect=${path}`} replace />;
  }
  return children;
};

export default Protected;
