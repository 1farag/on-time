import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import cartSlice from "./slices/auth/cartSlice";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
