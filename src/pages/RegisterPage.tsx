import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { RegisterForm } from "../components/RegisterForm";
import { setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/account");
      })
      .catch(console.error);
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
        <RegisterForm handleClick={handleRegister} />
      </div>
    </div>
  );
};
