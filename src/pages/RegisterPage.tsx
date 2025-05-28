import { RegisterForm } from "../components/forms/RegisterForm";
import { setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useState } from "react";
import axios from "axios";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    try {
      await axios.post("http://locallhost:8080/auth/registration", {
        email,
        password,
        repeatPassword: password,
        name,
      });

      // Після реєстрації одразу логін
      const loginRes = await axios.post("http://locallhost:8080/auth/login", {
        email,
        password,
      });

      const { token } = loginRes.data;

      dispatch(
        setUser({
          email,
          token,
          id: null,
        })
      );

      localStorage.setItem("token", token);
      navigate("/account");
    } catch (err: any) {
      console.error(err);
      setError("Помилка при реєстрації. Спробуйте ще раз.");
    }
  };
  return (
    <div className="mx-auto grid grid-cols-2 py-12 max-w-6xl items-start gap-5">
      <div className="w-full flex justify-center items-center h-[500px]">
        <img
          src="/photos/wine-glasses.png"
          alt="wine-glasses"
          className="max-h-full object-contain"
        />
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold max-w-md mx-auto mb-6">
          Реєстрація
        </h1>
        <RegisterForm handleClick={handleRegister} error={error}/>
      </div>
    </div>
  );
};
