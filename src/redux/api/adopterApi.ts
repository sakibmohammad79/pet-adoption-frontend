import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const adopterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdopter: build.query({
      query: () => ({
        url: '/adopter',
        method: "GET",
      }),
      providesTags: [tagTypes.adopter],
    }),
    getSingleAdopter: build.query({
      query: (id) => ({
        url: `/adopter/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.adopter],
    }),
    updateAdopter: build.mutation({
      query: (payload: any) => ({
        url: `/adopter/${payload?.id}`,
        method: "PATCH",
        contentType: 'application/json',
        data: payload?.data
      }),
      invalidatesTags: [tagTypes.adopter],
    }),
    getMyBookedPets: build.query({
      query: (id) => ({
        url: `/adopter/booked-pet/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.pet],
    }),
    getMyAdoptedPets: build.query({
      query: (id) => ({
        url: `/adopter/adopted-pet/${id}`,
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
  useGetMyBookedPetsQuery,
  useGetMyAdoptedPetsQuery,
  useGetAllAdopterQuery,
  useUpdateAdopterMutation
} = adopterApi;
