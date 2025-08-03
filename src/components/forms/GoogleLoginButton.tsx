import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setUser } from "../../store/slices/userSlice";

export function GoogleLoginButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  return (
    <div className="flex justify-center items-center">
      <GoogleLogin
        locale="uk"
        onSuccess={async (credentialResponse) => {
          try {
            const res = await axios.post("http://localhost:8080/auth/google", {
              credential: credentialResponse.credential,
            });
            const { token, id, name, email, role } = res.data;

            dispatch(setUser({ id, name, email, token, role }));
            localStorage.setItem(
              "user",
              JSON.stringify({ id, name, email, token, role })
            );
            if (role === "ROLE_MANAGER") {
              navigate("/admin");
            } else if (redirect) {
              navigate(redirect);
            } else {
              navigate("/account");
            }
          } catch (err) {
            alert("Помилка Google-авторизації");
          }
        }}
        onError={() => {
          alert("Помилка Google-авторизації");
        }}
      />
    </div>
  );
}
