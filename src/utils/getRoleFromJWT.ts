import { jwtDecode } from "jwt-decode";

export function getRoleFromJWT(token: string): string | null {
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    // подивись у decoded, можливо роль зветься "role" або "roles" або "authorities"
    // наприклад:
    // { sub: "test@gmail.com", role: "customer" }
    // або { sub: "...", roles: ["customer"] }
    // або { sub: "...", authorities: ["manager"] }
    // Повертаємо роль
    if (decoded.role) return decoded.role;
    if (decoded.roles && Array.isArray(decoded.roles)) return decoded.roles[0];
    if (decoded.authorities && Array.isArray(decoded.authorities)) return decoded.authorities[0];
    console.log('ksdmklmdcsl', decoded);
    return null;
  } catch (e) {
    return null;
  }
}