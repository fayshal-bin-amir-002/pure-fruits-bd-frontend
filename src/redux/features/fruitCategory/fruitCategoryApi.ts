import { baseApi } from "../../api/baseApi";

const fruitCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFruitCategory: builder.mutation({
      query: (data) => ({
        url: "/fruit-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FruitCategory"],
    }),
    getAllFruitCategory: builder.query({
      query: (params) => {
        if (!params || Object.keys(params).length === 0) {
          return {
            url: "/fruit-category",
            method: "GET",
          };
        }

        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/fruit-category?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["FruitCategory"],
    }),
    updateFruitCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/fruit-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FruitCategory"],
    }),
    deleteFruitCategory: builder.mutation({
      query: (id) => ({
        url: `/fruit-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FruitCategory"],
    }),
  }),
});

export const {
  useGetAllFruitCategoryQuery,
  useAddFruitCategoryMutation,
  useUpdateFruitCategoryMutation,
  useDeleteFruitCategoryMutation,
} = fruitCategoryApi;
