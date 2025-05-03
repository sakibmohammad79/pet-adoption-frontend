import { TMeta } from "@/types";
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
    updateAdmin: build.mutation({
      query: (payload: any) => ({
        url: `/admin/${payload?.id}`,
        method: "PATCH",
        contentType: 'application/json',
        data: payload?.data
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    getAdmins: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/admin",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
    getAdoptionRequest: build.query({
      query: () => ({
        url: "/admin/adoption-request",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return {
          adoptionRequest: response,
        };
      },
      providesTags: [tagTypes.adoption],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    approveAdoption: build.mutation({
      query: (id: string) => ({
        url: `/admin/pet-adoption-approved/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.adoption],
    }),
    rejectAdoption: build.mutation({
      query: (id: string) => ({
        url: `/admin/pet-adoption-rejected/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.adoption],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useGetAdoptionRequestQuery,
  useApproveAdoptionMutation,
  useRejectAdoptionMutation,
  useUpdateAdminMutation
} = adminApi;
