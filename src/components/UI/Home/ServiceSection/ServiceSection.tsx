import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import PetsIcon from "@mui/icons-material/Pets";

const ServiceSection = () => {
  return (
    <Container
      sx={{
        bgcolor: "#FFFFFF",
        py: { xs: 8, sm: 12, md: 16 }, // Adjust vertical padding for responsiveness
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }} // Stack direction changes on smaller screens
        justifyContent="center"
        alignItems="center"
        gap={{ xs: 4, md: 6 }} // Adjust gaps between items
      >
        {/* Text Section */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          {" "}
          {/* Center align text on smaller screens */}
          <Typography
            color="#0A303A"
            fontWeight={700}
            variant="h3"
            component="h1"
            fontSize={{ xs: "1.8rem", sm: "2.5rem", md: "3rem" }} // Responsive font sizes
          >
            Working For <br /> Dog{" "}
            <Box color="primary.main" component="span">
              Adoption
            </Box>{" "}
            Free,
            <br /> Happy Time
          </Typography>
          <Typography
            py={3}
            fontSize={{ xs: "0.9rem", sm: "1rem", md: "1.1rem" }} // Responsive paragraph font size
          >
            The best overall dog DNA test is Embark Breed & Health Kit
            <br /> (view at Chewy), which provides you with a breed breakdown
            and information.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              px: 3,
              py: 1,
              fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive button font size
              display: "flex",
              alignItems: "center",
            }}
          >
            Adoption
            <PetsIcon sx={{ pl: 1, height: 24, width: 24 }} />
          </Button>
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            overflow: "hidden",
            borderRadius: "10px",
            width: { xs: "100%", sm: 400, md: 500 }, // Responsive width
            height: { xs: 300, sm: 400, md: 500 }, // Responsive height
            "&:hover img": {
              transform: "scale(1.1)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          <Image
            alt="pet"
            src="https://i.postimg.cc/vBQtnT63/pexels-pixabay-45201.jpg"
            layout="responsive" // Ensures the image adjusts responsively
            width={500}
            height={500}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image scales properly
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default ServiceSection;
