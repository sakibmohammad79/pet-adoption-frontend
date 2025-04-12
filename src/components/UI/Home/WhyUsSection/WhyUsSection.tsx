"use client";

import { useGetAdoptionRequestQuery } from "@/redux/api/adminApi";
import { useGetAllAdopterQuery } from "@/redux/api/adopterApi";
import { useGetPetsQuery } from "@/redux/api/petApi";
import { useGetAllPublisherQuery } from "@/redux/api/publisherApi";
import { Box, Container,  Stack, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import GroupsIcon from "@mui/icons-material/Groups";
import { Fade } from "react-awesome-reveal";


const WhyUsSection = () => {
  const { data: petData } = useGetPetsQuery({});
  const { data: adoptionRequest } = useGetAdoptionRequestQuery({});
  const { data: adopterData } = useGetAllAdopterQuery({});
  const { data: petPublisher } = useGetAllPublisherQuery({});

  const pets =
    petData?.pets?.filter((pet: any) => pet.isAdopt === false && pet.isBooked === false) || [];

  const approvedAdoptions =
    adoptionRequest?.adoptionRequest?.filter(
      (item: any) => item.adoptionStatus === "APPROVED"
    ) || [];

  const adopters = adopterData || [];
  const publishers = petPublisher?.publisher || [];

  const stats = [
    {
      icon: <PetsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      value: pets.length,
      label: "Available Pets",
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40, color: "#ff4081" }} />,
      value: approvedAdoptions.length,
      label: "Successful Adoptions",
    },
    {
      icon: <EmojiPeopleIcon sx={{ fontSize: 40, color: "#388e3c" }} />,
      value: adopters.length,
      label: "Happy Adopters",
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: "#f57c00" }} />,
      value: publishers.length,
      label: "Trusted Publishers",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#F4F1EA", py: { xs: 8, md: 16 } }}>
      <Container>
        {/* Heading Section */}
        <Box textAlign="center">
          <Fade direction="down" cascade>
            <Typography
              variant="h5"
              component="h2"
              color="primary.main"
              fontWeight={600}
              fontSize={{ xs: "1.3rem", sm: "1.6rem" }}
              letterSpacing={1}
            >
              Why Choose Us?
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              color="#0A303A"
              fontWeight={700}
              pt={2}
              pb={6}
              fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.8rem" }}
              lineHeight={1.4}
            >
              Best Service to Breed Your
              <br />
              Beloved Pet Companions
            </Typography>
          </Fade>
        </Box>

        {/* Stats Section */}
        <Fade direction="up" cascade damping={0.2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            alignItems="center"
            gap={{ xs: 4, md: 6 }}
            flexWrap="wrap"
          >
            {stats.map((item, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  p: { xs: 4, sm: 5 },
                  textAlign: "center",
                  borderRadius: 5,
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                  width: { xs: "90%", sm: "200px" },
                  transition: "all 0.3s ease",
                  border: "2px solid transparent",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <Box mb={1}>{item.icon}</Box>
                <Typography
                  color="#0A303A"
                  variant="h2"
                  fontWeight={700}
                  fontSize={{ xs: "2.2rem", sm: "2.5rem", md: "3rem" }}
                >
                  {item.value}
                </Typography>
                <Typography
                  fontWeight={600}
                  fontSize={{ xs: "1rem", sm: "1.1rem" }}
                  mt={1}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Fade>
      </Container>
    </Box>
  );
};

export default WhyUsSection;
