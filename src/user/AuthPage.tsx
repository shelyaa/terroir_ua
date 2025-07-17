import { useNavigate, useSearchParams } from "react-router-dom";
import { removeUser, setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useEffect, useState } from "react";
import { AuthForm } from "../components/forms/AuthForm";
import axios from "axios";

export const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

 useEffect(() => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    dispatch(setUser(user));
  } else {
    dispatch(removeUser()); 
  }
}, [dispatch]);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      const { token, role } = res.data;
      console.log("Login response:", res.data);

      const meRes = await axios.get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { id, name, email: userEmail } = meRes.data;

      dispatch(
        setUser({
          id,
          name,
          email: userEmail,
          token,
          role,
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ id, name, email: userEmail, token, role })
      );
      console.log("User logged in:", { id, name, email: userEmail, role, token });

      if (role === "ROLE_MANAGER") {
        navigate("/admin");
      } else if (redirect) {
        navigate(redirect);
      } else {
        navigate("/account");
      }
      return true;
    } catch (err: any) {
      console.error(err);
      setError("Невірна пошта або пароль.");
      return false;
    }
  };

  return (
    <div className="mx-auto grid grid-cols-2 py-12 max-w-6xl items-start gap-5">
      <div className="w-full">
        <img src="/photos/grape.png" alt="grape-photo" className="w-180" />
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold max-w-md mx-auto mb-6">
          Увійти в акаунт
        </h1>
        <AuthForm handleClick={handleLogin} error={error} setError={setError} />
      </div>
    </div>
  );
};
