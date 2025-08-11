import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { FC, useState } from "react";
import { GoogleLoginButton } from "./GoogleLoginButton";

interface FormProps {
  handleClick: (email: string, pass: string) => Promise<boolean>;
  error: string;
  setError: (error: string) => void;
}

export const LoginForm: FC<FormProps> = ({ handleClick, error, setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleClick(email, password);
    if (success) {
      setError("");
    }
  };

  return (
    <form
      className="space-y-8 max-w-md mx-auto font-manrope"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="email" className="font-medium text-[#5A5A5A]">
          Введіть свою електронну адресу
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) {
              setError("");
            }
          }}
          className={error ? "border-red-600 bg-red-50" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="font-medium font-manrope text-[#5A5A5A]"
        >
          Введіть пароль
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
          className={error ? "border-red-600 bg-red-50" : ""}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-600 text-red-800 p-3 rounded-md text-sm flex items-center justify-between">
          <span>
            <strong>Помилка</strong>
            <br />
            {error}
          </span>
        </div>
      )}

      <div className="text-sm text-center">
        <span className="text-muted-foreground">Забув пароль? </span>
        <Link to="/reset-password" className="text-red-900 font-semibold">
          Змінити пароль
        </Link>
      </div>

      <div className="text-center text-muted-foreground">або</div>
      <div className="">
        <GoogleLoginButton />
      </div>
      <Button
        type="submit"
        className="w-full bg-red-900 hover:bg-red-800 text-white"
      >
        Увійти
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Ще не маєш акаунта? </span>
        <Link to="/register" className="text-red-900 font-semibold">
          Зареєструватись тут
        </Link>
      </div>
    </form>
  );
};
