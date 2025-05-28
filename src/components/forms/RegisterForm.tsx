import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FC, useState } from "react";

interface FormProps {
  handleClick: (email: string, pass: string, name: string) => void;
  error?: string;
}

export const RegisterForm: FC<FormProps> = ({ handleClick, error }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const isLongEnough = password.length >= 8;
  const isAlphaNumeric = /^[A-Za-z0-9]+$/.test(password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLongEnough || !isAlphaNumeric) {
      setLocalError(
        "Пароль має містити латинські літери та цифри і бути не менше 8 символів."
      );
      return;
    }

    if (password !== checkPassword) {
      setLocalError("Паролі не співпадають.");
      return;
    }

    setLocalError("");
    handleClick(email, password, name);
  };

  return (
    <form
      className="space-y-8 max-w-md mx-auto font-manrope"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="font-medium text-[#5A5A5A]">
          Введіть Імʼя
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="font-medium text-[#5A5A5A]">
          Введіть пароль
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!!password.length && (
          <div className="text-sm space-y-1">
            <p className={isAlphaNumeric ? "text-green-600" : "text-gray-500"}>
              Використовуйте латинські літери і цифри {isAlphaNumeric && "✔"}
            </p>
            <p className={isLongEnough ? "text-green-600" : "text-gray-500"}>
              Не менше 8 знаків {isLongEnough && "✔"}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="checkPassword" className="font-medium text-[#5A5A5A]">
          Введіть пароль повторно
        </Label>
        <Input
          id="checkPassword"
          name="checkPassword"
          type="password"
          placeholder="********"
          required
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
      </div>

      {(error || localError) && (
        <div className="text-red-600 text-sm text-center">
          {error || localError}
        </div>
      )}

      <div className="text-sm text-center">
        <span className="text-muted-foreground">Забув пароль? </span>
        <Link to="/reset-password" className="text-red-900 font-semibold">
          Змінити пароль
        </Link>
      </div>

      <div className="text-center">або</div>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        type="button"
      >
        <FcGoogle size={20} />
        Sign in with Google
      </Button>

      <Button
        type="submit"
        className="w-full bg-red-900 hover:bg-red-800 text-white"
      >
        Зареєструватись
      </Button>
    </form>
  );
};
