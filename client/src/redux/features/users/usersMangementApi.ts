import { baseApi } from "@/redux/api/baseApi";

const usersMangementApi = baseApi.injectEndpoints({
    endpoints:(builder) =>({
        getAllUsers : builder.query({
            query: (params: Record<string, unknown>) => ({
                url: "/users",
                method: "GET",
                params, 
              }),
        })
    })
})



export const {useGetAllUsersQuery} = usersMangementApi