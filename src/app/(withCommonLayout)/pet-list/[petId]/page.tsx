"use client";
import { useGetSinglePetsQuery } from "@/redux/api/petApi";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
const PetDetailsPage = ({ params }: any) => {
  const { data, isLoading } = useGetSinglePetsQuery(params.petId);

  if (isLoading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }
  return (
    <Box sx={{ backgroundColor: "#F4F1EA", py: 16 }}>
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            backgroundColor: "white",
            p: 6,
            boxShadow: 1,
            borderRadius: 2,
            maxWidth: 800,
            width: "100%",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={600}
              color="black"
              mb={2}
            >
              {data?.name}
            </Typography>
            <Typography mb={2}>
              The domestic dog is a doiated dendant of the wolf. The dog t is
              derived from an ancient, extinct wolf, and the modern grey wolf is
              the dog&rsquo;s nesdarest living relative. The dog was the first
              species to be domesticated, by hunter–gateiherers. These will
              include the core vaccines, which are in a series of three: at 6-,
              12-, and 16 weeks old.
            </Typography>
            <Box mb={2}>
              <Image
                height={300}
                width={800}
                src={data?.image}
                alt="pet_image"
              ></Image>
            </Box>
            <Typography
              mb={2}
              variant="h5"
              component="h1"
              color="black"
              fontWeight={600}
            >
              About Pet
            </Typography>
            <Typography mb={2}>{data?.description || "description"}</Typography>
            <Typography
              mb={2}
              variant="h5"
              component="h1"
              color="black"
              fontWeight={600}
            >
              Pet Information
            </Typography>
            <Divider sx={{ mb: 2 }}></Divider>

            <Box ml={2} pt={2}>
              <Grid container spacing={2}>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Name:
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {data?.name}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Age:
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {data?.age}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Color:
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {data?.color}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Gender:
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {data?.gender}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Size:
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {data?.size}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Breed:
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {data?.breed}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Locaion:
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {data?.location}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Health Status:
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {data?.healthStatus}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Button sx={{ mt: 4 }}>
            Apply Today <PetsIcon sx={{ pl: 1 }}></PetsIcon>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default PetDetailsPage;