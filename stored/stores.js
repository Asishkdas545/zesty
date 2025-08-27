import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlicer";

export const store = configureStore({
    reducer:{
        cartSlice : cartReducer,
    }
})