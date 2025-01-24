"use client";
import { Box, Container, Typography } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PetsIcon from "@mui/icons-material/Pets";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

const Testimonials = () => {
  const pets = [
    {
      name: "Golden Retriever",
      image: "https://i.postimg.cc/vBQtnT63/pexels-pixabay-45201.jpg",
      bgColor: "#FAD4D4",
    },
    {
      name: "German Shepherd",
      image: "https://i.postimg.cc/vBQtnT63/pexels-pixabay-45201.jpg",
      bgColor: "#F6E4C6",
    },
    {
      name: "Bulldog",
      image: "https://i.postimg.cc/vBQtnT63/pexels-pixabay-45201.jpg",
      bgColor: "#E5E5E5",
    },
    {
      name: "Poodle",
      image: "https://i.postimg.cc/vBQtnT63/pexels-pixabay-45201.jpg",
      bgColor: "#DADADA",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#F6F3EE", pt: 12, pb: 16 }}>
      <Container>
        <Box textAlign="center" mb={4}>
          <PetsIcon
            sx={{ py: 1, color: "primary.main", height: 40, width: 40 }}
          />
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
          <Typography
            fontSize={{ xs: "0.9rem", sm: "1rem" }}
            textAlign={{ xs: "center", md: "justify" }}
          >
            The best overall dog DNA test is Embark Breed & Health Kit (view at
            Chewy), which provides you with breed information and health
            insights.
          </Typography>
        </Box>

        <Box>
          {/* Responsive Swiper Slider */}
          <Swiper
            spaceBetween={20}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 }, // Mobile
              600: { slidesPerView: 2 }, // Tablets
              900: { slidesPerView: 2 }, // Small desktops
              1200: { slidesPerView: 3 }, // Large desktops
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {pets.map((pet, index) => (
              <SwiperSlide key={index}>
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
                      alt={pet.name}
                      height={70}
                      width={70}
                      src={pet.image}
                      style={{
                        borderRadius: "50%",
                        border: "2px solid #F4F1EA",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize={{ xs: "0.9rem", sm: "1rem" }}
                      textAlign="justify"
                    >
                      The best overall dog DNA test is Embark Breed & Health Kit
                      (view at Chewy), which provides you with breed and health
                      insights for your pet.
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
                          Mohammad Sakib
                        </Typography>
                        <Typography fontSize="0.9rem">
                          Software Engineer
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
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
