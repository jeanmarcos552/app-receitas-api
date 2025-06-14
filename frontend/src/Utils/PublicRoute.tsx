import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};
