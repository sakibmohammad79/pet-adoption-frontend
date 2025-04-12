import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReview: build.query({
      query: () => ({
        url: '/review',
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    createReview: build.mutation({
        query: (data) => ({
          url: "/review",
          method: "POST",
          contentType: "application/json",
          data,
        }),
        invalidatesTags: [tagTypes.review],
      }),
    publishReview: build.mutation({
      query: (id) => ({
        url: `/review/publish-review/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.review],
    }),
    unpublishReview: build.mutation({
      query: (id) => ({
        url: `/review/unpublish-review/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.review],
    }),
    deleteReview: build.mutation({
      query: (id) => ({
        url: `/review/delete-review/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
 useCreateReviewMutation,
 useGetAllReviewQuery,
 useDeleteReviewMutation,
 usePublishReviewMutation,
 useUnpublishReviewMutation
} = reviewApi;
