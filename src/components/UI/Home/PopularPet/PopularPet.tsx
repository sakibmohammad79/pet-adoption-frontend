"use client";
import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { useGetPetsQuery } from "@/redux/api/petApi";
import Link from "next/link";

const PopularPet = () => {
  const { data, isLoading } = useGetPetsQuery({});
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  const pets = data?.pets;

  return (
    <Container sx={{ pb: 16 }}>
      <Box textAlign="center" pb={8}>
        <PetsIcon sx={{ py: 1, color: "primary.main", height: 40, width: 40 }} />
        <Typography component="h1" variant="h6" color="primary.main" fontWeight={600}>
          Meet the animals
        </Typography>
        <Typography color="black" component="h1" variant="h4" fontWeight={700} my={1}>
          Puppies Waiting for Adoption
        </Typography>
        <Typography>
          The best overall dog DNA test is Embark Breed & Health Kit (view at Chewy),
          <br />
          which provides you with a breed breakdown and health information on most dogs.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        {/* Swiper Slider for multiple cards per slide */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          loop={true}
          style={{ width: "100%", height: "100%" }}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {pets?.map((pet: any, index: number) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#F4F1EA",
                  padding: 2,
                  textAlign: "center",
                  overflow: "hidden",
                  height: "400px", // Fixed height for cards
                  position: "relative",
                }}
              >
                <Image
                  src={pet?.image || "https://i.ibb.co/4JTh9dG/pexels-lina-1741205-1.jpg"}
                  alt={pet?.name}
                  width={400}
                  height={300} // Set fixed height for image
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover", // Ensures the image fills the space
                    transition: "transform 0.3s",
                  }}
                />

                {/* Adoption Button */}
                <Link href={`/pet-list/${pet.id}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      position: "absolute",
                      bottom: 25,
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                      fontWeight: "bold",
                      textTransform: "none",
                      width: "60%", // Adjust width of the button
                      padding: "8px 16px", // Smaller button size
                    }}
                    disabled={pet?.isAdopt || pet?.isBooked} // Disable button if the pet is adopted or booked
                  >
                    {pet?.isAdopt || pet?.isBooked ? "Adopted" : "Adopt Now"}
                  </Button>
                </Link>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Static Info Card */}
        <Box
          sx={{
            flex: { xs: "0 0 100%", md: "0 0 30%" },
            borderRadius: 2,
            padding: 6,
            backgroundColor: "primary.main",
            color: "white",
            textAlign: "left",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Dog Breeder
          </Typography>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Available for Breed
          </Typography>
          <Typography mb={2} color="white">
            The best overall dog DNA test is Embark Breed & Health Kit (view at Chewy), which provides dogs.
          </Typography>
          <Link href={'/pet-list'}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              More Pets
              <PetsIcon sx={{ pl: 1, height: 30, width: 30 }} />
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default PopularPet;
