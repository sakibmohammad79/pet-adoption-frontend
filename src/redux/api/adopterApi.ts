import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const adopterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleAdopter: build.query({
      query: (id) => ({
        url: `/adopter/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.adopter],
    }),
    getMyAdoptedPets: build.query({
      query: (id) => ({
        url: `/adopter/adopt-pet/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.pet],
    }),
    deleteAdopter: build.mutation({
      query: (id) => ({
        url: `/adopter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    bookPet: build.mutation({
      query: (data) => ({
        url: `/adopter/pet-booked`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.pet],
    }),
  }),
});

export const {
  useDeleteAdopterMutation,
  useBookPetMutation,
  useGetSingleAdopterQuery,
  useGetMyAdoptedPetsQuery,
} = adopterApi;
