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
    // Add more pet data as needed
  ];
  return (
    <Box sx={{ backgroundColor: "#F6F3EE", pt: 16, pb: 20 }}>
      <Container>
        <Box textAlign="center">
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
          >
            Our Happy Customers
          </Typography>
          <Typography>
            The best overall dog DNA test is Embark Breed & Health Kit (view at
            Chewy),<br></br> which provides you with a breed brwn and
            information Most dogs
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 6 }}>
          {/* Swiper Slider for multiple cards per slide */}
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            loop={true}
            style={{ width: "100%", height: "100%" }}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {pets.map((pet, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    p: 6,
                    bgcolor: "white",
                    borderRadius: 8,
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Box sx={{ width: "15%" }}>
                    <Image
                      alt="reviewer"
                      height={70}
                      width={70}
                      src={pet.image}
                      style={{
                        borderRadius: "50%",
                        border: "2px solid ##F4F1EA",
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "85%" }}>
                    <Typography>
                      The best overall dog DNA test is Embark Breed & Health Kit
                      (view at Chewy), which provides you with a breed brwn and
                      information Most dogs
                    </Typography>
                    <Box
                      display=" flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      <Box>
                        <Typography
                          color="#0A303A"
                          variant="h6"
                          fontWeight={600}
                        >
                          Mohammad Sakib
                        </Typography>
                        <Typography>Software Engineer</Typography>
                      </Box>
                      <RateReviewIcon
                        sx={{ color: "primary.main", height: 30, width: 30 }}
                      ></RateReviewIcon>
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
