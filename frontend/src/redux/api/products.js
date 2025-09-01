import { apiSlice } from "./apiSlice"
import { PRODUCT_URL } from "../constants"

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/get`,
        method: "GET",
      }),
    }),
     createProducts: builder.mutation({
  query: (formData) => ({
    url: `${PRODUCT_URL}/create`,
    method: "POST",
    body: formData,
  }),
}),

   editProducts: builder.mutation({
  query: ({ id, formData }) => ({
    url: `${PRODUCT_URL}/${id}`,
    method: "PUT",
    body: formData, // must be FormData, not JSON
  }),
}),


    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,  
        method: "DELETE",
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
} = productsApiSlice
