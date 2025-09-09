import { CART_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user cart
    getCart: builder.query({
      query: () => ({
        url: `${CART_URL}/`,
        method: "GET",
      }),
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

    // Update item quantity (uses cart itemId, not productId)
    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `${CART_URL}/${itemId}`,  // ✅ backend expects itemId in params
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Remove item from cart (uses cart itemId)
    removeCartItem: builder.mutation({
      query: ({ itemId }) => ({
        url: `${CART_URL}/${itemId}`,  // ✅ backend expects itemId
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
