import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const adopterApi = baseApi.injectEndpoints({
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
    // getAdmins: build.query({
    //   query: (arg: Record<string, any>) => ({
    //     url: "/admin",
    //     method: "GET",
    //     params: arg,
    //   }),
    //   transformResponse: (response: any, meta: TMeta) => {
    //     return {
    //       admins: response,
    //       meta,
    //     };
    //   },
    //   providesTags: [tagTypes.admin],
    // }),
    deleteAdopter: build.mutation({
      query: (id) => ({
        url: `/adopter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useDeleteAdopterMutation } = adopterApi;
