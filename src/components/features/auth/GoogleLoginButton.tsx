import {useSearchParams} from "react-router-dom";
import {API_BASE} from "../../../constants/apiConstant";

export function GoogleLoginButton() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const startGoogle = () => {
    localStorage.setItem("postLoginRedirect", redirect);
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  return (
    <button
      onClick={startGoogle}
      type="button"
      className="flex items-center gap-2 bg-white border px-4 py-2  hover:bg-gray-100 font-manrope font-semibold text-base text-bordo cursor-pointer"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  );
}
