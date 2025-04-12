"use client";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import PetCard from "./PetCard";
import Link from "next/link";
import { useGetPetsQuery } from "@/redux/api/petApi";

// Animation imports
import { Fade, Slide } from "react-awesome-reveal";

const speciesList = ["ALL", "CAT", "DOG", "BIRD", "RABBIT"];

const PetSection = () => {
  const [selectedSpecies, setSelectedSpecies] = useState("ALL");

  const { data, isLoading } = useGetPetsQuery(
    selectedSpecies === "ALL" ? {} : { species: selectedSpecies }
  );

  const pets = data?.pets || [];
  const publishedPets = pets.filter((pet: any) => pet.isPublished);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedSpecies(newValue);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ backgroundColor: "#FFFFFF", pt: 12, pb: 8 }}>
      <Box textAlign="center">
        <Fade direction="down" triggerOnce>
          <PetsIcon sx={{ py: 1, color: "primary.main", height: 40, width: 40 }} />
        </Fade>
        <Fade direction="down" cascade damping={0.1} triggerOnce>
          <Typography
            component="h1"
            variant="h6"
            color="primary.main"
            fontWeight={600}
          >
            Meet the animals
          </Typography>
          <Typography
            color="black"
            component="h1"
            variant="h4"
            fontWeight={700}
            my={1}
          >
            Puppies Waiting for Adoption
          </Typography>
          <Typography>
            Find your perfect pet! Browse through our available animals for adoption.
          </Typography>
        </Fade>

        {/* Tabs */}
        <Stack justifyContent="center" alignItems="center">
          <Box width={isMobile ? "100%" : "auto"} sx={{ overflowX: "auto" }}>
            <Slide direction="up" triggerOnce>
              <Tabs
                value={selectedSpecies}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="Pet species filter"
                sx={{
                  my: 4,
                  maxWidth: "100%",
                  "& .MuiTabs-flexContainer": {
                    justifyContent: isMobile ? "start" : "center",
                  },
                }}
              >
                {speciesList.map((species) => (
                  <Tab
                    sx={{ fontSize: 16 }}
                    key={species}
                    label={species}
                    value={species}
                  />
                ))}
              </Tabs>
            </Slide>
          </Box>
        </Stack>

        {/* Pet cards */}
        <Box my={8}>
          <Grid container spacing={4}>
            {publishedPets.slice(0, 6).map((pet: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Fade delay={index * 100} triggerOnce>
                  <PetCard pet={pet} />
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* View More Button */}
        <Slide direction="up" triggerOnce>
          <Link href="/pet-list">
            <Button sx={{ mt: 4 }}>View More</Button>
          </Link>
        </Slide>
      </Box>
    </Container>
  );
};

export default PetSection;
