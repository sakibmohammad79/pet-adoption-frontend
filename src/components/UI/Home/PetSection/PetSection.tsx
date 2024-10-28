"use server";

import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import PetCard from "./PetCard";

const PetSection = async () => {
  const res = await fetch("http://localhost:3000/api/v1/pet");
  const result = await res.json();
  const pets = result.data;
  console.log(pets);
  return (
    <Container sx={{ backgroundColor: "#FFFFFF", py: 16 }}>
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

        <Box my={8}>
          <Grid container spacing={6}>
            {pets?.slice(0, 6).map((pet: any) => (
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

export default PetSection;
