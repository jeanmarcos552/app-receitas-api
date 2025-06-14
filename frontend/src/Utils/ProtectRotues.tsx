import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const ProtectRoutes = () => {
  const { token, loading } = useAuth();

  
  if (loading) return null;

  return token ? <Outlet /> : <Navigate to="/login" />;
};
