import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { fetchCart } from "../../api/fetchCart";

interface CartItem {
  id: string;
  quantity: number;
  wineId: string;
  price: number;
}

export interface CartState {
  userId: number | null;
  amount: number;
  cartItems: CartItem[];
  deliveryPrice: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const getInitialState = (): CartState => {
  const cookieCart = Cookies.get("cart");
  if (cookieCart) {
    return { ...JSON.parse(cookieCart), loading: false };
  }
  return {
    userId: null,
    amount: 0,
    cartItems: [],
    deliveryPrice: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  };
};

// Функція для підрахунку суми і total
const recalculateTotals = (state: CartState) => {
  state.amount = state.cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );
  state.deliveryPrice = state.amount > 1000 ? 0 : 100;
  state.totalPrice = state.amount + state.deliveryPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.wineId === item.wineId);

      if (existItem) {
        existItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      recalculateTotals(state);
      // Зберігаємо у cookies тільки якщо немає userId (неавторизований)
      if (!state.userId) {
        Cookies.set("cart", JSON.stringify(state));
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      recalculateTotals(state);
      if (!state.userId) {
        Cookies.set("cart", JSON.stringify(state));
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.cartItems.find((x) => x.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      recalculateTotals(state);
      if (!state.userId) {
        Cookies.set("cart", JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.deliveryPrice = 0;
      state.totalPrice = 0;
      Cookies.remove("cart");
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setUser: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
      // Якщо користувач залогінився — видаляємо локальний кошик
      if (action.payload) {
        Cookies.remove("cart");
      }
    },

    removeUser: (state) => {
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      // Мерджимо cartItems: quantity беремо з редакса, якщо є
      const mergedCartItems = action.payload.cartItems.map((backendItem) => {
        const reduxItem = state.cartItems.find(
          (r) => r.wineId === backendItem.wineId
        );
        return {
          ...backendItem,
          quantity: reduxItem ? reduxItem.quantity : 1,
          price: reduxItem?.price ?? backendItem.price ?? 0,
        };
      });

      return {
        ...state,
        ...action.payload,
        cartItems: mergedCartItems,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setLoading,
  setError,
  setUser,
  removeUser,
} = cartSlice.actions;

export default cartSlice.reducer;
