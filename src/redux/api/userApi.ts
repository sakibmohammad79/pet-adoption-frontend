import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // createAdmin: build.mutation({
    //   query: (data) => ({
    //     url: "/user/create-admin",
    //     method: "POST",
    //     contentType: "multipart/form-data",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.admin],
    // }),
    getUsers: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/user",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    // deleteAdmin: build.mutation({
    //   query: (id) => ({
    //     url: `/admin/soft/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.admin],
    // }),
  }),
});

export const { useGetUsersQuery } = userApi;
