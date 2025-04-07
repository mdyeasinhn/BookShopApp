import { baseApi } from "@/redux/api/baseApi";


const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllOrders: builder.query({
      query: () => "/orders",
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify",
        params: { order_id },
        method: "GET",
      }),
    }),

    getMyOrder: builder.query({
      query: (email) => ({
        url: `/orders/my-order/${email}`,
        method: "GET",
      }), 
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/delete-order/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useVerifyOrderQuery,
} = orderApi;