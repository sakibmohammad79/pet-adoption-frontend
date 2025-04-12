import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const publisherApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
    getAllPublisher: build.query({
      query: () => ({
        url: '/publisher',
        method: "GET",
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          publisher: response,
          meta,
        };
      },
      providesTags: [tagTypes.publisher],
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

export const { useDeletePublisherMutation, useGetMyCreatredPetQuery, useGetAllPublisherQuery } =
  publisherApi;
