import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartReducerInitialState } from "../../types/reducerTypes";
import type { cartItem } from "../../types/types";

const initialState:CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
}}; 

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {

  addToCart: (state, action: PayloadAction<cartItem>) => {
  state.loading = true;
  const index = state.cartItems.findIndex(
    (i) => i.productId === action.payload.productId
  );
  if (index !== -1) state.cartItems[index] = action.payload;
  else state.cartItems.push(action.payload);
  state.loading = false;
},
    removeFromCart:(state , action: PayloadAction<string> ) => {
        state.loading = true;
        state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
        state.loading = false;

  },
  calculatePrice: (state) => {
  const subtotal = 3434;
  state.subtotal = subtotal;
  state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
  state.tax = Math.round(state.subtotal * 0.18);
  state.total =
  state.subtotal + state.tax + state.shippingCharges -
  state.discount;
},
},
});

export const { addToCart, removeFromCart } = cartReducer.actions;