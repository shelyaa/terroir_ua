import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Account } from "../components/Account";

export const AccountPage = () => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <div className="mx-auto py-12 max-w-7xl items-start">
      <h1 className="text-3xl font-semibold">Мій профіль</h1>
      <Account />
    </div>
  ) : (
    <Navigate to="/auth" replace />
  );
};
