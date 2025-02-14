import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const prevLogin = (localStorage.getItem("user"))

  return prevLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
