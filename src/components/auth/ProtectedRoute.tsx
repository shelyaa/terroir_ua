import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAppSelector } from "../../hooks/redux";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: string;
};

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const isAuth = useAuth();
  const user = useAppSelector((state) => state.user);

  if (!isAuth) return <Navigate to="/login" />;
  if (requiredRole && !user.role) return null; 
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/wine" />;
  console.log(requiredRole, user.role, isAuth);

  return children;
}
