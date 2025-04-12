"use client";


import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FieldValues, SubmitHandler, Controller, useForm, FormProvider } from "react-hook-form";

import { toast } from "sonner";
import { Star, StarBorder } from "@mui/icons-material";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import { useGetMyProfileQuery } from "@/redux/api/userApi";


const ReviewPage = () => {
 
  const {data: profileData} = useGetMyProfileQuery({})
  const adopterId = profileData?.profile?.publisher?.id;

  const [createReview, { isLoading }] = useCreateReviewMutation();
  const methods = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
      reviewerId: ""
    },
    mode: "onChange",
  });

  const { control,  reset } = methods;

  const handleReviewSubmit: SubmitHandler<FieldValues> = async (value) => {
    // console.log(value);
    try {
      const reviewData = {
        ...value,
        reviewerId: adopterId,
      }
      console.log(reviewData);
      
      const res = await createReview(reviewData).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Your review was sent successfully!");
        reset();
      } else {
        toast.error("Failed to send review.");
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error("An error occurred while sending the review.");
    }
  };

  return (
    <Container>
      <Stack sx={{ minHeight: "90vh", justifyContent: "center", alignItems: "center", py: 8 }}>
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 3,
            borderRadius: 3,
            p: 4,
            backgroundColor: "#fff",
          }}
        >
          <Box mb={3} textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              <Box component="span" color="primary.main">
                Give
              </Box>{" "}
              Your Review
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Help us improve with your honest feedback.
            </Typography>
          </Box>

            <PetForm onSubmit={handleReviewSubmit}>
              <Grid container spacing={3}>
                {/* Star Rating */}
                <Grid item xs={12}>
               
                <Controller
  name="rating"
  // control={control}
  rules={{ required: "Rating is required" }}
  render={({ field }) => (
    <Box display="flex" justifyContent="center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          onClick={() => field.onChange(star)} // This is fine
          sx={{ cursor: "pointer", mx: 0.5 }}
        >
          {Number(field.value) >= star ? (
            <Star sx={{ fontSize: 40, color: "#FFA41C" }} />
          ) : (
            <StarBorder sx={{ fontSize: 40, color: "#C0C0C0" }} />
          )}
        </Box>
      ))}
    </Box>
  )}
/>

                </Grid>

                {/* Feedback Text */}
                <Grid item xs={12}>
                  <PetInput
                    name="comment"
                    fullWidth
                    label="Write your feedback"
                    type="text"
                    size="medium"
                    multiline
                   rows={4}
                    rules={{
                      required: "Feedback is required",
                      validate: {
                        minWords: (value: string) =>
                          value.trim().split(/\s+/).length >= 10 || "Minimum 10 words required",
                        maxWords: (value: string) =>
                          value.trim().split(/\s+/).length <= 100 || "Maximum 100 words allowed",
                      },
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box position="relative">
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: 16,
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                      disabled={isLoading}
                    >
                      Submit Review
                    </Button>
                    {isLoading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: "primary.main",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </PetForm>
     
        </Box>
      </Stack>
    </Container>
  );
};

export default ReviewPage;
