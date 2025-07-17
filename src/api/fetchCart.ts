import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Отримання кошика для авторизованого користувача (токен у headers)
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Зберігаємо токен у user.token (зроби відповідну структуру userSlice)
      const state: any = getState();
      const token = state.user.token;
      const res = await axios.get("http://localhost:8080/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Кошик отримано:", res.data);
      return res.data;

    } catch (e) {
      return rejectWithValue("Не вдалося отримати кошик");
    }
  }
);