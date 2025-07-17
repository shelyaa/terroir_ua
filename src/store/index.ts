import { configureStore } from "@reduxjs/toolkit"; 
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>