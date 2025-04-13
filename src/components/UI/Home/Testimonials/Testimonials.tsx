"use client";
import { Box, Container, Typography } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PetsIcon from "@mui/icons-material/Pets";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { useGetAllReviewQuery } from "@/redux/api/reviewApi";
import { getUserInfo } from "@/services/auth.services";

const Testimonials = () => {
  
  const { data: reviews } = useGetAllReviewQuery({});
  const publishedReviews = reviews?.filter((review: any) => review?.isPublished);

  return (
    <Box sx={{ backgroundColor: "#F6F3EE", pt: 12, pb: 16 }}>
      <Container>
        <Box textAlign="center" mb={4}>
          <PetsIcon sx={{ py: 1, color: "primary.main", height: 40, width: 40 }} />
          <Typography
            component="h1"
            variant="h6"
            color="primary.main"
            fontWeight={600}
          >
            Testimonials
          </Typography>
          <Typography
            color="black"
            component="h1"
            variant="h4"
            fontWeight={700}
            my={1}
            fontSize={{ xs: "1.8rem", sm: "2.4rem" }}
          >
            Our Happy Customers
          </Typography>
          <Typography sx={{textAlign: "center"}}
            fontSize={{ xs: "0.9rem", sm: "1rem" }}
            textAlign={{ xs: "center", md: "justify" }}
          >
            Hear what our lovely users say about their experience with us!
          </Typography>
        </Box>

        <Box>
          <Swiper
            spaceBetween={20}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              900: { slidesPerView: 2 },
              1200: { slidesPerView: 2 },
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {publishedReviews?.map((review: any) => {
              const user = review.publisher || review.adopter;
              const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
             
              const profilePhoto =
                user?.profilePhoto || "https://i.postimg.cc/Pxf7WpS0/user.png";
                const reviewerRole = review.publisher ? "Publisher" : "Adopter";

              return (
                <SwiperSlide key={review.id}>
                  <Box
                    sx={{
                      p: 4,
                      bgcolor: "white",
                      borderRadius: 4,
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "center", sm: "flex-start" },
                    }}
                  >
                    <Box sx={{ flexShrink: 0 }}>
                      <Image
                        alt={`${fullName}'s photo`}
                        height={70}
                        width={70}
                        src={profilePhoto}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #F4F1EA",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        fontSize={{ xs: "0.9rem", sm: "1rem" }}
                        textAlign="justify"
                      >
                        {review?.comment || "No comment available."}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        <Box>
                          <Typography
                            color="#0A303A"
                            variant="h6"
                            fontWeight={600}
                            fontSize={{ xs: "0.9rem", sm: "1.2rem" }}
                          >
                            {fullName}
                          </Typography>
                         
                          <Typography fontSize="0.8rem" color="text.secondary">
  {reviewerRole}
</Typography>
                          <Typography fontSize="0.9rem" mt={0.5}>
                            {"⭐".repeat(review?.rating || 0)}
                          </Typography>
                        </Box>
                        <RateReviewIcon
                          sx={{
                            color: "primary.main",
                            height: 30,
                            width: 30,
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
