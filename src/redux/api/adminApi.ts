import { tagTypes, tagTypesList } from "../tag-types";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/user/create-admin",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    getAdmins: build.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAdminsQuery,
  useDeleteAdminMutation,
} = adminApi;
