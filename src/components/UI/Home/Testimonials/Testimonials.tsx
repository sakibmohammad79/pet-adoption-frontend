// "use client";
// import { Box, Container, Typography } from "@mui/material";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import PetsIcon from "@mui/icons-material/Pets";
// import { Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/autoplay";
// import Image from "next/image";
// import { useGetAllReviewQuery } from "@/redux/api/reviewApi";
// import { getUserInfo } from "@/services/auth.services";

// const Testimonials = () => {
  
//   const { data: reviews } = useGetAllReviewQuery({});
//   const publishedReviews = reviews?.filter((review: any) => review?.isPublished);

//   return (
//     <Box sx={{ backgroundColor: "#F6F3EE", pt: 12, pb: 16 }}>
//       <Container>
//         <Box textAlign="center" mb={4}>
//           <PetsIcon sx={{ py: 1, color: "primary.main", height: 40, width: 40 }} />
//           <Typography
//             component="h1"
//             variant="h6"
//             color="primary.main"
//             fontWeight={600}
//           >
//             Testimonials
//           </Typography>
//           <Typography
//             color="black"
//             component="h1"
//             variant="h4"
//             fontWeight={700}
//             my={1}
//             fontSize={{ xs: "1.8rem", sm: "2.4rem" }}
//           >
//             Our Happy Customers
//           </Typography>
//           <Typography sx={{textAlign: "center"}}
//             fontSize={{ xs: "0.9rem", sm: "1rem" }}
//             textAlign={{ xs: "center", md: "justify" }}
//           >
//             Hear what our lovely users say about their experience with us!
//           </Typography>
//         </Box>

//         <Box>
//           <Swiper
//             spaceBetween={20}
//             loop={true}
//             modules={[Autoplay]}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//             }}
//             breakpoints={{
//               0: { slidesPerView: 1 },
//               600: { slidesPerView: 2 },
//               900: { slidesPerView: 2 },
//               1200: { slidesPerView: 2 },
//             }}
//             style={{ width: "100%", height: "100%" }}
//           >
//             {publishedReviews?.map((review: any) => {
//               const user = review.publisher || review.adopter;
//               const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
             
//               const profilePhoto =
//                 user?.profilePhoto || "https://i.postimg.cc/Pxf7WpS0/user.png";
//                 const reviewerRole = review.publisher ? "Publisher" : "Adopter";

//               return (
//                 <SwiperSlide key={review.id}>
//                   <Box
//                     sx={{
//                       p: 4,
//                       height: {xs: 250, md: 180},
//                       bgcolor: "white",
//                       borderRadius: 4,
//                       display: "flex",
//                       gap: 2,
//                       flexDirection: { xs: "column", sm: "row" },
//                       alignItems: { xs: "center", sm: "flex-start" },
//                     }}
//                   >
//                     <Box sx={{ flexShrink: 0 }}>
//                       <Image
//                         alt={`${fullName}'s photo`}
//                         height={70}
//                         width={70}
//                         src={profilePhoto}
//                         style={{
//                           borderRadius: "50%",
//                           border: "2px solid #F4F1EA",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </Box>
//                     <Box>
//                       <Typography
//                         fontSize={{ xs: "0.9rem", sm: "1rem" }}
//                         textAlign="justify"
//                       >
//                         {review?.comment || "No comment available."}
//                       </Typography>
//                       <Box
//                         display="flex"
//                         justifyContent="space-between"
//                         alignItems="center"
//                         mt={2}
//                       >
//                         <Box>
//                           <Typography
//                             color="#0A303A"
//                             variant="h6"
//                             fontWeight={600}
//                             fontSize={{ xs: "0.9rem", sm: "1.2rem" }}
//                           >
//                             {fullName}
//                           </Typography>
                         
//                           <Typography fontSize="0.8rem" color="text.secondary">
//                           {reviewerRole}
//                       </Typography>
//                           <Typography fontSize="0.9rem" mt={0.5}>
//                             {"⭐".repeat(review?.rating || 0)}
//                           </Typography>
//                         </Box>
//                         <RateReviewIcon
//                           sx={{
//                             color: "primary.main",
//                             height: 30,
//                             width: 30,
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                   </Box>
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Testimonials;

"use client";
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Card, 
  CardContent, 
  Rating, 
  Stack,
  Chip,
  Paper
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PetsIcon from "@mui/icons-material/Pets";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import { useGetAllReviewQuery } from "@/redux/api/reviewApi";
import { getUserInfo } from "@/services/auth.services";

// Custom CSS for Swiper pagination
const swiperStyles = `
  .custom-swiper .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.3) !important;
    opacity: 1 !important;
  }
  .custom-swiper .swiper-pagination-bullet-active {
    background: white !important;
  }
  .custom-swiper .swiper-pagination {
    bottom: 20px !important;
  }
`;

const Testimonials = () => {
  const { data: reviews } = useGetAllReviewQuery({});
  const publishedReviews = reviews?.filter((review: any) => review?.isPublished);

  // Calculate average rating
  const averageRating = publishedReviews?.length 
    ? publishedReviews.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / publishedReviews.length
    : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />
      <Box 
        sx={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: { xs: 8, md: 16 },
          position: "relative",
          overflow: "hidden"
        }}
      >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          filter: "blur(100px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -300,
          left: -300,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          filter: "blur(120px)",
        }}
      />

      <Container sx={{ position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={3}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <PetsIcon sx={{ fontSize: 32, color: "white" }} />
            </Avatar>
            <Chip 
              label="Customer Stories" 
              sx={{ 
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                px: 3,
                py: 1,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }} 
            />
          </Stack>
          
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "white",
              fontWeight: 800,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              lineHeight: 1.2,
              mb: 3,
              textShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}
          >
            What Our Family Says
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              lineHeight: 1.6,
              maxWidth: 600,
              mx: "auto",
              mb: 4,
              textShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}
          >
            Real stories from real families who found their perfect companions through our platform
          </Typography>

          {/* Statistics */}
          <Stack 
            direction="row" 
            justifyContent="center" 
            alignItems="center" 
            spacing={4}
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: 6,
              p: 3,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "inline-flex"
            }}
          >
            <Box textAlign="center">
              <Typography variant="h4" fontWeight="bold" color="white">
                {publishedReviews?.length || 0}
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                Happy Reviews
              </Typography>
            </Box>
            <Box textAlign="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h4" fontWeight="bold" color="white">
                  {averageRating.toFixed(1)}
                </Typography>
                <Rating 
                  value={averageRating} 
                  readOnly 
                  size="small"
                  sx={{ 
                    "& .MuiRating-iconFilled": { color: "#ffd700" },
                    "& .MuiRating-iconEmpty": { color: "rgba(255, 255, 255, 0.3)" }
                  }}
                />
              </Stack>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                Average Rating
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Testimonials Carousel */}
        <Box sx={{ position: "relative" }}>
          <Swiper
            spaceBetween={30}
            loop={true}
            centeredSlides={true}
            modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ 
              width: "100%", 
              paddingBottom: "60px",
            }}
            className="custom-swiper"
          >
            {publishedReviews?.map((review: any) => {
              const user = review.publisher || review.adopter;
              const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "Anonymous";
              const profilePhoto = user?.profilePhoto || "https://i.postimg.cc/Pxf7WpS0/user.png";
              const reviewerRole = review.publisher ? "Pet Publisher" : "Pet Adopter";

              return (
                <SwiperSlide key={review.id}>
                  <Card
                    sx={{
                      height: { xs: 350, sm: 320, md: 300 },
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      borderRadius: 4,
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "visible",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    {/* Quote icon */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -15,
                        left: 20,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <FormatQuoteIcon sx={{ color: "white", fontSize: 20 }} />
                    </Box>

                    <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                      {/* Rating */}
                      <Box sx={{ mb: 2 }}>
                        <Rating 
                          value={review?.rating || 0} 
                          readOnly 
                          size="small"
                          sx={{ 
                            "& .MuiRating-iconFilled": { color: "#ffd700" }
                          }}
                        />
                      </Box>

                      {/* Review content */}
                      <Typography
                        sx={{
                          fontSize: { xs: "0.95rem", sm: "1rem" },
                          lineHeight: 1.6,
                          color: "text.primary",
                          fontStyle: "italic",
                          flex: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          mb: 3
                        }}
                      >
                        {review?.comment || "This platform has been amazing for connecting with pets!"}
                      </Typography>

                      {/* User info */}
                      <Box sx={{ mt: "auto" }}>
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <Box sx={{ position: "relative" }}>
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                border: "3px solid white",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <Image
                                src={profilePhoto}
                                alt={`${fullName}'s photo`}
                                width={50}
                                height={50}
                                style={{ 
                                  borderRadius: "50%", 
                                  objectFit: "cover" 
                                }}
                              />
                            </Avatar>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: -2,
                                right: -2,
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                bgcolor: "success.main",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid white",
                              }}
                            >
                              <VerifiedIcon sx={{ fontSize: 12, color: "white" }} />
                            </Box>
                          </Box>
                          
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                fontSize: { xs: "1rem", sm: "1.1rem" },
                                color: "text.primary",
                                mb: 0.5
                              }}
                            >
                              {fullName}
                            </Typography>
                            <Chip
                              label={reviewerRole}
                              size="small"
                              sx={{
                                fontSize: "0.75rem",
                                height: 24,
                                bgcolor: "primary.50",
                                color: "primary.700",
                                fontWeight: "medium"
                              }}
                            />
                          </Box>

                          <RateReviewIcon
                            sx={{
                              color: "primary.main",
                              fontSize: 28,
                              opacity: 0.7
                            }}
                          />
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom navigation buttons */}
          <Box className="swiper-button-prev-custom" 
            sx={{
              position: "absolute",
              left: { xs: -10, sm: -30 },
              top: "50%",
              transform: "translateY(-50%)",
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              zIndex: 10,
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
                transform: "translateY(-50%) scale(1.1)",
              }
            }}
          >
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>‹</Typography>
          </Box>

          <Box className="swiper-button-next-custom"
            sx={{
              position: "absolute",
              right: { xs: -10, sm: -30 },
              top: "50%",
              transform: "translateY(-50%)",
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              zIndex: 10,
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
                transform: "translateY(-50%) scale(1.1)",
              }
            }}
          >
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>›</Typography>
          </Box>
        </Box>

        {/* Bottom CTA */}
        <Box textAlign="center" mt={8}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "inline-block"
            }}
          >
            <Typography variant="h6" color="white" fontWeight="bold" mb={1}>
              Want to share your story?
            </Typography>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
              Join our community and help other families find their perfect companions
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
    </>
  );
};

export default Testimonials;