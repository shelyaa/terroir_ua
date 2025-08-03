import { useState } from "react";
import { addWineToCart } from "../api/addWineToCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";
import { useAppDispatch } from "./redux-hooks";
import { Wine } from "../types/Wine";

export function useAddToCart() {
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
      onError?: (e: any) => void;
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
      navigate("/order");
    } catch (e) {
      setLoading(false);
      options?.onError?.(e);
    }
  };
  return { addWine, loading };
}