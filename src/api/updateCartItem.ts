import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { wineId, quantity }: { wineId: string; quantity: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).user.token;
      if (!token) return rejectWithValue("Користувач не авторизований");
      await axios.put(
        `http://localhost:8080/cart/cart-items/${wineId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Отримати оновлений кошик:
      const res = await axios.get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (e) {
      return rejectWithValue("Не вдалося оновити кількість");
    }
  }
);