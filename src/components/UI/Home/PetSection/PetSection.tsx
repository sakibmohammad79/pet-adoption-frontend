
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

const speciesList = ["ALL", "CAT", "DOG", "BIRD", "RABBIT"] as const;

interface Pet {
  id: string;
  name: string;
  breed: string;
  gender: string;
  image?: string;
  isPublished: boolean;
  isAdopt: boolean;
  isBooked: boolean;
}

interface PetsResponse {
  pets: Pet[];
}

const PetSection = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<string>("ALL");

  const { data, isLoading } = useGetPetsQuery(
    selectedSpecies === "ALL" ? {} : { species: selectedSpecies }
  ) as { data?: PetsResponse; isLoading: boolean };

  const pets = data?.pets || [];
  const publishedPets = pets.filter((pet: Pet) => pet.isPublished);

  const handleSpeciesChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedSpecies(newValue);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          minHeight: "200px"
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#FFFFFF", pt: 12, pb: 8 }}>
      <Box textAlign="center">
        {/* Header Section */}
        <Fade direction="down" triggerOnce>
          <PetsIcon 
            sx={{ 
              py: 1, 
              color: "primary.main", 
              fontSize: { xs: 32, sm: 40 }
            }} 
          />
        </Fade>
        
        <Fade direction="down" cascade damping={0.1} triggerOnce>
          <Typography
            component="h2"
            variant="h6"
            color="primary.main"
            fontWeight={600}
            sx={{ mt: 1 }}
          >
            Meet the animals
          </Typography>
          
          <Typography
            color="black"
            component="h1"
            variant="h4"
            fontWeight={700}
            
            sx={{ 
              my: 2,
              fontSize: { xs: '1.75rem', sm: '2.125rem' },
               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Puppies Waiting for Adoption
          </Typography>
          
          <Typography 
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
          >
            Find your perfect pet! Browse through our available animals for adoption.
          </Typography>
        </Fade>

        {/* Species Filter Tabs */}
        <Stack justifyContent="center" alignItems="center">
          <Box width={isMobile ? "100%" : "auto"} sx={{ overflowX: "auto" }}>
            <Slide direction="up" triggerOnce>
              <Tabs
                value={selectedSpecies}
                onChange={handleSpeciesChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="Pet species filter"
                sx={{
                  my: 4,
                  maxWidth: "100%",
                  "& .MuiTabs-flexContainer": {
                    justifyContent: isMobile ? "flex-start" : "center",
                  },
                  "& .MuiTab-root": {
                    fontSize: 16,
                    fontWeight: 500,
                    textTransform: "capitalize",
                    minWidth: { xs: 80, sm: 100 },
                  },
                }}
              >
                {speciesList.map((species) => (
                  <Tab
                    key={species}
                    label={species}
                    value={species}
                  />
                ))}
              </Tabs>
            </Slide>
          </Box>
        </Stack>

        {/* Pet Cards Grid */}
        <Box my={6}>
          {publishedPets.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {publishedPets.slice(0, 6).map((pet: Pet, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={pet.id}>
                  <Fade delay={index * 100} triggerOnce>
                    <PetCard pet={pet} />
                  </Fade>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ py: 8 }}
            >
              No pets available for the selected category.
            </Typography>
          )}
        </Box>

        {/* View More Button */}
        {publishedPets.length > 6 && (
          <Slide direction="up" triggerOnce>
            <Link href="/pet-list" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained"
                size="large"
                sx={{ 
                  mt: 4,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                View More Pets
              </Button>
            </Link>
          </Slide>
        )}
      </Box>
    </Container>
  );
};

export default PetSection;