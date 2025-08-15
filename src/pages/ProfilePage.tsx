import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Account } from "../components/features/auth/Account";

export const ProfilePage = () => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <div className="mx-auto py-12 max-w-5xl items-start px-4">
      <h1 className="text-3xl font-semibold">Мій профіль</h1>
      <Account />
    </div>
  ) : (
    <Navigate to="/auth" replace />
  );
};
