// import { GoogleLogin } from "@react-oauth/google";
// import { useSearchParams } from "react-router-dom";

// export function GoogleLoginButton() {
//   const [searchParams] = useSearchParams();
//   const redirect = searchParams.get("redirect") || "/account";

//   const API = "http://localhost:8080";

//   const startGoogle = () => {
//     localStorage.setItem("postLoginRedirect", redirect);
//     window.location.href = `${API}/oauth2/authorization/google`;
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div onClick={startGoogle} className="cursor-pointer">
//         <GoogleLogin
//           locale="uk"
//           onSuccess={() => {}}
//           onError={() => {}}
//           useOneTap={false}
//         />
//       </div>
//     </div>
//   );
// }

import { useSearchParams } from "react-router-dom";

export function GoogleLoginButton() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const API = "http://localhost:8080";

  const startGoogle = () => {
    localStorage.setItem("postLoginRedirect", redirect);
    window.location.href = `${API}/oauth2/authorization/google`;
  };

  return (
    <button
      onClick={startGoogle}
      className="px-4 py-2 rounded bg-black text-white"
    >
      Увійти через Google
    </button>
  );
}
