import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { AdminHeader } from "../components/AdminHeader";

export const AdminLayout = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setRole(user.role);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (role === "ROLE_MANAGER") {
    return (
      <div>
        <AdminHeader />
        <Outlet />
        <Footer />
      </div>
    );
  }

  return <Navigate to="/" />;
};