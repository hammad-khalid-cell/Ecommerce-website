import { CART_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user cart
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    // Add item to cart
    addToCart: builder.mutation({
      query: (body) => ({
        url: `${CART_URL}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // Update item quantity
    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Remove item from cart
    removeCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = cartApiSlice;
