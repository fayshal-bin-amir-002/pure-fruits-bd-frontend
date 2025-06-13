import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: (params) => {
        if (!params || Object.keys(params).length === 0) {
          return {
            url: "/user",
            method: "GET",
          };
        }

        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/user?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    statusChange: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    roleChange: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-role/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetAllUserQuery,
  useStatusChangeMutation,
  useRoleChangeMutation,
} = userApi;
