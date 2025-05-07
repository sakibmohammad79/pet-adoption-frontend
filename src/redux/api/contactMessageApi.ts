
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const contactMessageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllContactMessage: build.query({
      query: () => ({
        url: "/contactmessage",
        method: "GET",
      }),
      providesTags: [tagTypes.contactMessage],
    }),
    createContactMessage: build.mutation({
        query: (data) => ({
          url: "/contactmessage/create-message",
          method: "POST",
          contentType: "application/json",
          data,
        }),
        invalidatesTags: [tagTypes.contactMessage],
    }),
    deleteMessage: build.mutation({
      query: (id: string) => ({
        url: `/contactmessage/delete-message/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.contactMessage],
    }),
  }),
});

export const { useCreateContactMessageMutation, useGetAllContactMessageQuery, useDeleteMessageMutation  } = contactMessageApi;
