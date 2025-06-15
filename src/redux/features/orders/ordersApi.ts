import { baseApi } from "../../api/baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getAllOrder: builder.query({
      query: (params) => {
        if (!params || Object.keys(params).length === 0) {
          return {
            url: "/order",
            method: "GET",
          };
        }

        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/order?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Order"],
    }),
    getMyOrder: builder.query({
      query: (id: string) => {
        return {
          url: `/order/my-order/${id}`,
          method: "GET",
        };
      },
      providesTags: ["MyOrder"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetAllOrderQuery,
  useGetMyOrderQuery,
  useUpdateStatusMutation,
} = ordersApi;
