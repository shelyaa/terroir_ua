import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useState } from "react";
import { AuthForm } from "../components/forms/AuthForm";
import axios from "axios";

export const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await axios.post("http://locallhost:8080/auth/login", {
        email,
        password,
      });

      const { token } = res.data;

      dispatch(
        setUser({
          email,
          token,
          id: null, // або отримуй ID, якщо повертається
        })
      );

      localStorage.setItem("token", token);
      navigate("/account");
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
        <img src="/photos/grape.png" alt="grape-photo" className=" w-180 " />
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
