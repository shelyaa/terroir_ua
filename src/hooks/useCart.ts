import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useAppDispatch } from "./redux";
import { Wine } from "../types/Wine";
import { addWineToCart } from "../api/cart";

export function useCart() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addWine = async (
    wine: Wine,
    quantity: number,
    options?: {
      onSuccess?: () => void;
      onAuthRedirect?: () => void;
      onError?: (e: unknown) => void;
    }
  ) => {
    if (!isAuth) {
      options?.onAuthRedirect?.();
      setTimeout(() => {
        setLoading(false);
        navigate(`/auth/?redirect=/order`);
      }, 1000);
      await dispatch(addWineToCart({ wineId: wine.id, quantity })).unwrap();

      return;
    }

    setLoading(true);
    try {
      await dispatch(addWineToCart({ wineId: wine.id, quantity })).unwrap();

      setLoading(false);

      options?.onSuccess?.();
    } catch (e) {
      setLoading(false);
      options?.onError?.(e);
    }
  };
  return { addWine, loading };
}
