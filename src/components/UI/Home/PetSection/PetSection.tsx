"use client";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import PetCard from "./PetCard";
import Link from "next/link";
import { useGetPetsQuery } from "@/redux/api/petApi";

const PetSection = () => {
  const { data, isLoading } = useGetPetsQuery({});
  const pets = data?.pets;
  const publishedPets = pets?.filter((pet: any) => pet.isPublished);

  if (isLoading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }
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

        <Box my={8}>
          <Grid container spacing={6}>
            {publishedPets?.slice(0, 6).map((pet: any) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={pet.id}>
                <PetCard pet={pet} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Link href="/pet-list">
          <Button sx={{ mt: 4 }}>View More</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default PetSection;
