import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user/userSlice';
import productReducer from "./slices/ProductSlice"
import categoryReducer from "./slices/categorySlice"
import cartReducer from "./slices/cartSlice"
import { apiSlice } from './api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { saveCart } from './slices/cartPersistence';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user : userReducer,
    products :productReducer,
    category : categoryReducer,
    cart : cartReducer,
  },
  middleware :  (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:  true,
});

store.subscribe(() => {
  saveCart(store.getState().cart.items);
});

