import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FC, useState } from "react";
import { GoogleLoginButton } from "./GoogleLoginButton";

interface FormProps {
  handleClick: (email: string, pass: string, name: string) => void;
  error?: string;
}

export const RegisterForm: FC<FormProps> = ({ handleClick, error }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [fieldError, setFieldError] = useState<
    null | "name" | "email" | "password" | "checkPassword"
  >(null);

  const isLongEnough = password.length >= 8;
  const isAlphaNumeric = /^[A-Za-z0-9]+$/.test(password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setRegisterError("Введіть імʼя.");
      setFieldError("name");
      return;
    }
    if (!email) {
      setRegisterError("Введіть електронну адресу.");
      setFieldError("email");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setRegisterError("Неправильний формат електронної адреси.");
      setFieldError("email");
      return;
    }

    if (!isLongEnough || !isAlphaNumeric) {
      setRegisterError(
        "Пароль має містити латинські літери та цифри і бути не менше 8 символів."
      );
      setFieldError("password");
      return;
    }

    if (!checkPassword) {
      setRegisterError("Повторіть пароль.");
      setFieldError("checkPassword");
      return;
    }

    if (password !== checkPassword) {
      setRegisterError("Паролі не співпадають.");
      setFieldError("checkPassword");
      return;
    }

    setRegisterError("");
    setFieldError(null);
    handleClick(email, password, name);
  };

  const handleNameChange = (v: string) => {
    setName(v);
    if (fieldError === "name") {
      setRegisterError("");
      setFieldError(null);
    }
  };
  const handleEmailChange = (v: string) => {
    setEmail(v);
    if (fieldError === "email") {
      setRegisterError("");
      setFieldError(null);
    }
  };
  const handlePasswordChange = (v: string) => {
    setPassword(v);
    if (fieldError === "password") {
      setRegisterError("");
      setFieldError(null);
    }
  };
  const handleCheckPasswordChange = (v: string) => {
    setCheckPassword(v);
    if (fieldError === "checkPassword") {
      setRegisterError("");
      setFieldError(null);
    }
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
          onChange={(e) => handleNameChange(e.target.value)}
          className={fieldError === "name" ? "border-red-600 bg-red-50" : ""}
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
          onChange={(e) => handleEmailChange(e.target.value)}
          className={fieldError === "email" ? "border-red-600 bg-red-50" : ""}
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
          onChange={(e) => handlePasswordChange(e.target.value)}
          className={
            fieldError === "password" ? "border-red-600 bg-red-50" : ""
          }
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
          onChange={(e) => handleCheckPasswordChange(e.target.value)}
          className={
            fieldError === "checkPassword" ? "border-red-600 bg-red-50" : ""
          }
        />
      </div>

      {(registerError || error) && (
        <div className="bg-red-50 border border-red-600 text-red-800 p-3 rounded-md text-sm flex items-center justify-between">
          <span>
            <strong>Помилка</strong>
            <br />
            {registerError || error}
          </span>
        </div>
      )}

      <div className="text-center">або</div>

      <div className="flex justify-center">
        {" "}
        <GoogleLoginButton />
      </div>

      <Button
        type="submit"
        className="w-full bg-red-900 hover:bg-red-800 text-white"
      >
        Зареєструватись
      </Button>
    </form>
  );
};
