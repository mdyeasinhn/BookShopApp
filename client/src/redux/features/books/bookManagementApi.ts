import { baseApi } from "../../api/baseApi";

const bicycleManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (params: Record<string, unknown>) => ({
        url: "/books",
        method: "GET",
        params, 
      }),
   //   providesTags: ['book'],
    }),

 
  }),
});

export const {useGetAllBooksQuery } =
  bicycleManagementApi;