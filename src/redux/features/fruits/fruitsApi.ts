import { baseApi } from "../../api/baseApi";

const fruitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFruit: builder.mutation({
      query: (data) => ({
        url: "/fruit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Fruit"],
    }),
    getAllFruit: builder.query({
      query: (params) => {
        if (!params || Object.keys(params).length === 0) {
          return {
            url: "/fruit",
            method: "GET",
          };
        }

        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/fruit?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Fruit"],
    }),
    getAFruit: builder.query({
      query: (id) => ({
        url: `/fruit/${id}`,
        method: "GET",
      }),
    }),
    updateFruit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/fruit/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Fruit"],
    }),
    deleteFruit: builder.mutation({
      query: (id) => ({
        url: `/fruit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Fruit"],
    }),
  }),
});

export const {
  useAddFruitMutation,
  useDeleteFruitMutation,
  useGetAFruitQuery,
  useGetAllFruitQuery,
  useUpdateFruitMutation,
} = fruitsApi;
