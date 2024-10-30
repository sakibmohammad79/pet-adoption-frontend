import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import PetsIcon from "@mui/icons-material/Pets";

const ServiceSection = () => {
  return (
    <Container sx={{ bgcolor: "#FFFFFF", pt: 16, pb: 10 }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={6}
      >
        <Box>
          <Box>
            <Typography
              color="#0A303A"
              fontWeight={700}
              variant="h3"
              component="h1"
            >
              Working For <br></br> Dog{" "}
              <Box color="primary.main" component="span">
                Adoption
              </Box>{" "}
              Free,<br></br> Happy Time
            </Typography>
            <Typography py={3}>
              The best overall dog DNA test is Embark Breed & Health Kit
              <br></br> (view at Chewy), which provides you with a breed brwn
              and information.
            </Typography>
            <Button>
              Adoption
              <PetsIcon sx={{ pl: 1, height: 30, width: 30 }}></PetsIcon>
            </Button>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              overflow: "hidden",
              borderRadius: "10px",
              width: 500,
              height: 500,
              "&:hover img": {
                transform: "scale(1.1)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <Image
              alt="pet"
              height={500}
              width={500}
              src="https://i.postimg.cc/vBQtnT63/pexels-pixabay-45201.jpg"
              style={{ borderRadius: "10px", width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ServiceSection;
