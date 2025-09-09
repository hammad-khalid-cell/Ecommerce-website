import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants"; 

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${ORDERS_URL}/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,
} = orderApiSlice;
