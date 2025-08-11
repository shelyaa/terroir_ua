import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCart } from "../../api/fetchCart";
import { addWineToCart, removeWineFromCart, updateCartItem } from "../../api/cart";
import { CartState } from "../../types/Cart";

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  deliveryPrice: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Якщо треба локально очищати стейт корзини (наприклад після логаута)
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.deliveryPrice = 0;
      state.totalPrice = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<CartState>) => {
          state.cartItems = action.payload.cartItems;
          state.amount = action.payload.amount;
          state.deliveryPrice = action.payload.deliveryPrice;
          state.totalPrice = action.payload.totalPrice;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Не вдалося отримати кошик";
      })
      // addWineToCart
      .addCase(addWineToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addWineToCart.fulfilled,
        (state, action: PayloadAction<CartState>) => {
          state.cartItems = action.payload.cartItems;
          state.amount = action.payload.amount;
          state.deliveryPrice = action.payload.deliveryPrice;
          state.totalPrice = action.payload.totalPrice;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(addWineToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Не вдалося додати у кошик";
      })
      // update
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCartItem.fulfilled,
        (state, action: PayloadAction<CartState>) => {
          state.cartItems = action.payload.cartItems;
          state.amount = action.payload.amount;
          state.deliveryPrice = action.payload.deliveryPrice;
          state.totalPrice = action.payload.totalPrice;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Не вдалося додати у кошик";
      })
      .addCase(removeWineFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeWineFromCart.fulfilled,
        (state, action: PayloadAction<CartState>) => {
          state.cartItems = action.payload.cartItems;
          state.amount = action.payload.amount;
          state.deliveryPrice = action.payload.deliveryPrice;
          state.totalPrice = action.payload.totalPrice;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(removeWineFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Не вдалося видалити з кошика";
      });
  },
});

export const { setLoading, setError, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
