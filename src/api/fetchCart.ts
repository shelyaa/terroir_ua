import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../constants/apiConstant";


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.user.token;
      const res = await axios.get(`${API_BASE}/cart`, {
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