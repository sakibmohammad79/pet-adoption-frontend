import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const publisherApi = baseApi.injectEndpoints({
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
    getMyCreatredPet: build.query({
      query: (id: string) => ({
        url: `/publisher/pet/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          pets: response,
          meta,
        };
      },
      providesTags: [tagTypes.pet],
    }),
    deletePublisher: build.mutation({
      query: (id) => ({
        url: `/publisher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useDeletePublisherMutation, useGetMyCreatredPetQuery } =
  publisherApi;
