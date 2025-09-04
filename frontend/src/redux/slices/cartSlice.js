import { createSlice } from "@reduxjs/toolkit";
import { loadCart, saveCart } from "./cartPersistence";

const initialState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.productId === item.productId);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      saveCart(state.items); // ✅ persist after update
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.productId !== action.payload);
      saveCart(state.items); 
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existing = state.items.find(i => i.productId === productId);
      if (existing) {
        existing.quantity = quantity;
      }
      saveCart(state.items); // ✅ persist
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state.items); // ✅ persist
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
