import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          profile: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
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
  }),
});

export const { useGetUsersQuery, useGetMyProfileQuery } = userApi;
