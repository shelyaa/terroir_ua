import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import checkoutUserReducer from "./slices/checkoutSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    checkoutUser: checkoutUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
