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
      const res = await axios.get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (e) {
      return rejectWithValue("Не вдалося додати у кошик");
    }
  }
);

export const removeWineFromCart = createAsyncThunk(
  "cart/removeWineFromCart",
  async (wineId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.user.token;
      const isAuth = !!token;

      if (!isAuth) return rejectWithValue("Користувач не авторизований");
      await axios.delete(`http://localhost:8080/cart/cart-items/${wineId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await axios.get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue("Не вдалося видалити з кошика");
    }
  }
);

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