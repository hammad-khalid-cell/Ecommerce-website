import { apiSlice } from "./apiSlice"
import { CATEGORY_URL } from "../constants"

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/get`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    editCategory: builder.mutation({
      query: ({id, ...data}) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data}`,
        method: "DELETE",
      }),
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/get/${id}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useCategoryByIdQuery,
} = categoryApiSlice
