import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const addWineToCart = createAsyncThunk(
  "cart/addWineToCart",
  async (
    { wineId, quantity }: { wineId: string; quantity: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).user.token;
      if (!token) return rejectWithValue("Користувач не авторизований");
      await axios.post(
        "http://localhost:8080/cart",
        { wineId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Зазвичай після додавання бажано отримати оновлений кошик:
      const res = await axios.get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (e) {
      return rejectWithValue("Не вдалося додати у кошик");
    }
  }
);