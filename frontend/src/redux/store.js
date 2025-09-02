import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user/userSlice';
import productReducer from "./slices/ProductSlice"
import categoryReducer from "./slices/categorySlice"

import { apiSlice } from './api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user : userReducer,
    products :productReducer,
    category : categoryReducer,
  },
  middleware :  (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:  true,
});

setupListeners(store.dispatch);

