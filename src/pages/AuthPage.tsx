import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { AuthForm } from "../components/forms/AuthForm";

export const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const auth = getAuth();

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        })
      );
      navigate("/account");
      return true;
    } catch (error: unknown) {
      console.error("Login error:", error);
      const firebaseError = error as FirebaseError;

      switch (firebaseError.code) {
        case "auth/invalid-email":
          setError("Неправильний формат електронної пошти.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Неправильно введені дані. Спробуйте ще раз.");
          break;
        default:
          setError("Сталася помилка. Спробуйте ще раз.");
      }
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
