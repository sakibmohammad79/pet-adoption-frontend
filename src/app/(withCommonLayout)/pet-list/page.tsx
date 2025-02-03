"use client";
import PetCard from "@/components/UI/Home/PetSection/PetCard";
import {
  Box,
  CircularProgress,
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
import { useGetPetsQuery } from "@/redux/api/petApi";
import { useState } from "react";
const AllPetList = () => {
  const speciesList = ["ALL", "CAT", "DOG", "BIRD", "RABBIT"];
  const [selectedSpecies, setSelectedSpecies] = useState("ALL");

  // Fetch pets based on selected species
  const { data, isLoading } = useGetPetsQuery(
    selectedSpecies === "ALL" ? {} : { species: selectedSpecies }
  );
  const pets = data?.pets;

  // Responsive settings
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  const publishedPets = pets?.filter((pet: any) => pet.isPublished);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedSpecies(newValue);
  };

  return (
    <Container sx={{ backgroundColor: "#FFFFFF", pt: 16, pb: 8 }}>
      <Box textAlign="center">
        <Box>
          <PetsIcon
            sx={{ py: 1, color: "primary.main", height: 40, width: 40 }}
          />
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
            The best overall dog DNA test is Embark Breed & Health Kit (view at
            Chewy),
            <br />
            which provides you with a breed breakdown and health information on
            most dogs.
          </Typography>
        </Box>

        <Stack justifyContent="center" alignItems="center">
          <Box width={isMobile ? "100%" : "auto"} sx={{ overflowX: "auto" }}>
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
          </Box>
        </Stack>

        <Box my={8}>
          <Grid container spacing={6}>
            {publishedPets?.map((pet: any) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={pet.id}>
                <PetCard pet={pet} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AllPetList;
