import { RegisterForm } from "../components/forms/RegisterForm";
import { setUser } from "../store/slices/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useState } from "react";
import axios from "axios";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    try {
      await axios.post("http://localhost:8080/auth/registration", {
        email,
        password,
        repeatPassword: password,
        name,
      });

      const loginRes = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const { token } = loginRes.data;

      dispatch(
        setUser({
          email,
          token,
          name,
        })
      );

      localStorage.setItem("user", JSON.stringify({ email, token, name }));
      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/account");
      }
    } catch (err: any) {
      console.error(err);
      setError("Помилка при реєстрації. Спробуйте ще раз.");
    }
  };
  return (
    <div className="mx-auto grid md:grid-cols-2 grid-cols-1 py-12 max-w-6xl items-start gap-5">
      <div className="w-full flex justify-center items-center h-[500px] md:block hidden">
        <img
          src="/auth/wine-glasses.png"
          alt="wine-glasses"
          className="max-h-full object-contain "
        />
      </div>
      <div className="w-full px-8">
        <h1 className="text-3xl font-semibold max-w-md mx-auto mb-6">
          Реєстрація
        </h1>
        <RegisterForm handleClick={handleRegister} error={error} />
      </div>
    </div>
  );
};
