import { apiSlice } from "./apiSlice"
import { USERS_URL } from "../constants"

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/get`,
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/get/${id}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useGetUsersQuery,
  useUserByIdQuery,
} = categoryApiSlice
