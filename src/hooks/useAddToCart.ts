import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { addToCart } from "../store/slices/cartSlice";
import { addWineToCart } from "../api/cart";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Wine } from "../types/Wine";

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
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
    setLoading(true);

    dispatch(
      addToCart({
        id: wine.id + "-" + Date.now(),
        wineId: wine.id,
        price: wine.price,
        quantity,
      })
    );

      if (!isAuth) {
      options?.onAuthRedirect?.(); // Показати повідомлення

      setTimeout(() => {
      setLoading(false);

        navigate(`/auth/?redirect=/order`);
      }, 1000); // Почекати 2 сек перед редиректом
      return;
    }

    try {
      await addWineToCart(wine.id, quantity, token ?? "");
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
