import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import addressSlice from "./addressSlice";
import ContactSlice from "./ContactSlice";
import HomeSlice from "./HomeSlice";

const store = configureStore({
  reducer: {
    cartCount: cartSlice.reducer,
    address: addressSlice.reducer,
    ContactSlice,
    HomeSlice,
  },
});

export default store;
