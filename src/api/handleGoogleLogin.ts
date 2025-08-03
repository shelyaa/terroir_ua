export async function handleGoogleLogin(idToken: string) {
  try {
    const res = await fetch("http://localhost:8080/api/auth/google-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
      credentials: "include", // якщо бекенд ставить httpOnly cookie
    });

    if (res.ok) {
      // Якщо бекенд повертає JWT у тілі:
      const data = await res.json();
      // Наприклад, { token: "JWT...", user: {...} }
      // Зберігаємо токен у localStorage, якщо це не httpOnly cookie
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
      }
      // Можна виконати редірект або оновити стан додатку
      return {
        success: true,
        user: data.user,
      };
    } else {
      // Помилка авторизації
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