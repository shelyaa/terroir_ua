import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { AdminAccount } from "../components/AdminAccount";

export const AdminAccountPage = () => {
  const { isAuth, isLoading } = useAuth();
  console.log(isAuth);
  if (isLoading) return <div>Loading...</div>;

  return isAuth ? (
    <div className="mx-auto py-12 max-w-7xl items-start px-4">
      <h1 className="text-3xl font-semibold">Адмін профіль</h1>
      <AdminAccount />
    </div>
  ) : (
    <Navigate to="/auth" />
  );
};
