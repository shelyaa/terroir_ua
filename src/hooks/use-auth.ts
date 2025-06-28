import { useAppSelector } from "./redux-hooks";

export function useAuth() {
    const { email, token, name } = useAppSelector(state => state.user);
    return {
      isAuth: Boolean(token),
      email,
      name,
    };
}