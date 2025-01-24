import { Box, Container, Stack, Typography } from "@mui/material";

const WhyUsSection = () => {
  return (
    <Box sx={{ backgroundColor: "#F4F1EA", py: { xs: 8, md: 16 } }}>
      <Container>
        {/* Heading Section */}
        <Box textAlign="center">
          <Typography
            variant="h5"
            component="h1"
            color="primary.main"
            fontWeight={600}
            fontSize={{ xs: "1.2rem", sm: "1.5rem" }}
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
            fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
          >
            Best Service to Breeds Your
            <br />
            Loved Dog Explore
          </Typography>
        </Box>

        {/* Stats Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={{ xs: 4, md: 6 }}
        >
          {[
            { value: "75%", label: "dogs are first bred" },
            { value: "45+", label: "Years Of History" },
            { value: "259+", label: "Most dogs are first" },
            { value: "39K", label: "Dog Breeding" },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "white",
                p: { xs: 4, sm: 5 },
                textAlign: "center",
                borderRadius: 5,
                boxShadow: 1,
                width: { xs: "90%", sm: "auto" },
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <Typography
                color="#0A303A"
                variant="h2"
                fontWeight={600}
                fontSize={{ xs: "2rem", sm: "2.5rem", md: "3rem" }}
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {item.value}
              </Typography>
              <Typography
                fontWeight={600}
                fontSize={{ xs: "0.9rem", sm: "1rem" }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default WhyUsSection;
