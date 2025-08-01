import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";
import { useAuth } from "../hooks/use-auth";

import { ReactNode } from "react";

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

  if (!isAuth) return <Navigate to="/auth" />;
  if (requiredRole && !user.role) return null; // чекаємо, поки підвантажиться
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/wine" />;
  console.log(requiredRole, user.role, isAuth);

  return children;
}
