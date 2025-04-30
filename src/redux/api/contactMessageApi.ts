
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const contactMessageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContactMessage: build.mutation({
        query: (data) => ({
          url: "/contactmessage/create-message",
          method: "POST",
          contentType: "application/json",
          data,
        }),
        invalidatesTags: [tagTypes.contactMessage],
    }),
    getAllContactMessage: build.query({
      query: () => ({
        url: "/contactmessage",
        method: "GET",
      }),
      providesTags: [tagTypes.contactMessage],
    }),
  }),
});

export const { useCreateContactMessageMutation, useGetAllContactMessageQuery  } = contactMessageApi;
