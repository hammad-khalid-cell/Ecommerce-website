import { apiSlice } from "./apiSlice"
import { PRODUCT_URL } from "../constants"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/get`,
        method: "GET",
      }),
    }),
    createProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    editProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/edit`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/get/${id}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useCreateProductsMutation,
  useEditProductsMutation,
  useDeleteProductsMutation,
  useGetProductByIdQuery,
} = userApiSlice
