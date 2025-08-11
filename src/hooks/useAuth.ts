import { useAppSelector } from "./redux";

export function useAuth() {
    const { email, token, name, isLoading } = useAppSelector(state => state.user);
    return {
      isAuth: Boolean(token),
      email,
      name,
      isLoading,
      token,
    };
}