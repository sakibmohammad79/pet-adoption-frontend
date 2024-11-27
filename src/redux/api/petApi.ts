import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const petApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPet: build.mutation({
      query: (data) => ({
        url: "/pet",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.pet],
    }),
    getPets: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/pet",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          pets: response,
          meta,
        };
      },
      providesTags: [tagTypes.pet],
    }),
    getSinglePets: build.query({
      query: (id: string) => ({
        url: `/pet/${id}`,
        method: "GET",
      }),
      // transformResponse: (response: any, meta: TMeta) => {
      //   return {
      //     pets: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.pet],
    }),
    deletePet: build.mutation({
      query: (id) => ({
        url: `/pet/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.pet],
    }),
    publishPet: build.mutation({
      query: (id) => ({
        url: `/admin/pet-publish/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.pet],
    }),
  }),
});

export const {
  useGetPetsQuery,
  useDeletePetMutation,
  useCreatePetMutation,
  usePublishPetMutation,
  useGetSinglePetsQuery,
} = petApi;
