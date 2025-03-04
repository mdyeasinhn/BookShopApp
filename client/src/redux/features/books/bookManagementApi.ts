import { baseApi } from "../../api/baseApi";

const bookManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (params: Record<string, unknown>) => ({
        url: "/books",
        method: "GET",
        params, 
      }),
   //   providesTags: ['book'],
    }),
    getSingleBooks: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
      // providesTags: ['book']
    }),

    createBook: builder.mutation({
      query: (bookInfo) => ({
        url: "/books",
        method: "POST",
        body: bookInfo,
      }),
    }),
  }),
});

export const {useGetAllBooksQuery, useGetSingleBooksQuery, useCreateBookMutation} =
  bookManagementApi;