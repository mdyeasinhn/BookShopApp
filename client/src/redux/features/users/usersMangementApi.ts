import { baseApi } from "@/redux/api/baseApi";

const usersMangementApi = baseApi.injectEndpoints({
    endpoints:(builder) =>({
        getAllUsers : builder.query({
            query: (params: Record<string, unknown>) => ({
                url: "/users",
                method: "GET",
                params, 
              }),
        }),
        getUserByEmail: builder.query({
            query: (email) => ({
              url: `/users/profile/${email}`,
              method: "GET",
            }),
          }),
          blockUser: builder.mutation({
            query: (id) => ({
              url: `/users/block/${id}`,
              method: "PATCH",
            }),
            invalidatesTags: ["user"],
          }),
    })
})



export const {useGetAllUsersQuery, useGetUserByEmailQuery} = usersMangementApi