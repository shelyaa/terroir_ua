import { API_BASE } from "../constants/apiConstant";

export async function handleGoogleLogin(idToken: string) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/google-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
      credentials: "include", 
    });

    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
      }
      return {
        success: true,
        user: data.user,
      };
    } else {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Помилка авторизації через Google",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Мережева помилка авторизації",
    };
  }
}