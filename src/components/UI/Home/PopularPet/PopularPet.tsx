"use client";
import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Typography, Button, Container, Stack, Avatar, Chip } from "@mui/material";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { useGetPetsQuery } from "@/redux/api/petApi";
import Link from "next/link";

const PopularPet = () => {
  const { data, isLoading } = useGetPetsQuery({});
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const pets = data?.pets || [];
  const limitedPets = pets.slice(0, 8);
  const availablePets = limitedPets?.filter((pet: any) => !pet?.isAdopt && !pet?.isBooked);


  return (
    <Container sx={{ pb: 16, pt: 16 }}>
      
       <Box textAlign="center" mb={8}>
          <Stack 
            direction="row" 
            justifyContent="center" 
            alignItems="center" 
            spacing={2} 
            mb={3}
            sx={{ flexWrap: "wrap" }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.05)" },
                  "100%": { transform: "scale(1)" },
                }
              }}
            >
              <PetsIcon sx={{ fontSize: 32, color: "white" }} />
            </Avatar>
            <Chip
              label="Find Your Companion" 
              sx={{ 
                bgcolor: "primary.main", 
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                px: 3,
                py: 1
              }} 
            />
          </Stack>
          
          <Typography
            variant="h2"
            component="h1"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              lineHeight: 1.2,
              mb: 3,
              textAlign: "center"
            }}
          >
            Meet Your New
            <br />
            Best Friend
          </Typography>
          
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              maxWidth: 700, 
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.2rem" },
              lineHeight: 1.6,
              mb: 3,
              px: 2
            }}
          >
            Discover loving pets waiting for their forever homes. Each one has a unique personality 
            and is ready to bring joy to your family.
          </Typography>

          <Stack 
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center" 
            spacing={4} 
            sx={{ 
              backgroundColor: "white", 
              borderRadius: 3, 
              p: 3, 
              display: "inline-flex",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              minWidth: { xs: "280px", sm: "auto" }
            }}
          >
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                {availablePets?.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Pets
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="bold" color="success.main">
                {pets.filter((pet: any) => pet?.isAdopt).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Happy Adoptions
              </Typography>
            </Box>
          </Stack>
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