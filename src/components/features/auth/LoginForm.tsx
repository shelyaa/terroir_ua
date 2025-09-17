import {Label} from "../.././ui/label";
import {Input} from "../.././ui/input";
import {Button} from "../.././ui/button";
import {Link, useNavigate} from "react-router-dom";
import {FC, useEffect, useState} from "react";
import {GoogleLoginButton} from "./GoogleLoginButton";
import {useAppDispatch} from "../../../hooks/redux";
import {setUser} from "../../../store/slices/userSlice";
import axios from "axios";
import { API_BASE } from "../../../constants/apiConstant";

interface FormProps {
  handleClick: (email: string, pass: string) => Promise<boolean>;
  error: string;
  setError: (error: string) => void;
}

export const LoginForm: FC<FormProps> = ({handleClick, error, setError}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1) read token from query or hash
    const search = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const token = search.get("token") || hash.get("token");
    const role = search.get("role") || hash.get("role");

    // 2) quick diagnostics
    console.debug("OAuth callback URL", {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      token,
      role,
    });

    if (!token) return; // nothing to do; user may be doing email/password

    // 3) optional: fetch user
    (async () => {
      try {
        const meRes = await axios.get(`${API_BASE}/users/me`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        const {id, name, email: userEmail} = meRes.data;
        const user = {id, name, email: userEmail, token, role};

        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));

        window.history.replaceState(null, "", "/auth");

        const post = localStorage.getItem("postLoginRedirect") || "/account";
        localStorage.removeItem("postLoginRedirect");

        navigate(role === "ROLE_MANAGER" ? "/admin" : post, {replace: true});
      } catch (e) {
        console.error("Failed to load /users/me after OAuth", e);
      }
    })();
  }, [dispatch, navigate]);

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
      <div className="flex justify-center">
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
