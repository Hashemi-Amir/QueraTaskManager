import { Navigate } from "react-router-dom";

type ProtectedProps = {
  children: React.ReactNode;
  path: string;
};

const Protected = ({ children, path }: ProtectedProps) => {
  const isLoggedIn = localStorage.getItem("authToken");

  if (!isLoggedIn) {
    return <Navigate to={`/login?redirect=${path}`} replace />;
  }
  return children;
};

export default Protected;
