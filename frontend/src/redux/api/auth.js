import { apiSlice } from "./apiSlice"
import { AUTH_URL } from "../constants"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   getUserLogout: builder.mutation({
  query: () => ({
    url: `${AUTH_URL}/logout`,
    method: "POST",
    credentials: "include"
  }),
}),


  }),
})

export const {
      useGetUserLogoutMutation
  
} = authApiSlice
