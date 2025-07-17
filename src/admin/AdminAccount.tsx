import { Navigate } from "react-router-dom";
import { Account } from "../components/Account";
import { useAuth } from "../hooks/use-auth";

export const AdminAccount = () => {
  const { isAuth, isLoading } = useAuth();
  console.log(isAuth);
  if (isLoading) return <div>Loading...</div>;

  return isAuth ? (
    <div className="mx-auto py-12 max-w-7xl items-start">
      <h1 className="text-3xl font-semibold">Адмін профіль</h1>
      <Account />
    </div>
  ) : (
    <Navigate to="/auth" />
  );
};
