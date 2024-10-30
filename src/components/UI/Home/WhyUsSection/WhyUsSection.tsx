import { Box, Container, Stack, Typography } from "@mui/material";

const WhyUsSection = () => {
  return (
    <Box sx={{ backgroundColor: "#F4F1EA", py: 16 }}>
      <Container>
        <Box textAlign="center">
          <Typography
            variant="h5"
            component="h1"
            color="primary.main"
            fontWeight={600}
          >
            Why Choose Us?
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            color="#0A303A"
            fontWeight={700}
            pt={2}
            pb={8}
          >
            Best Service to Breeds Your<br></br> Loved Dog Explore
          </Typography>
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={6}
        >
          <Box
            sx={{
              backgroundColor: "white",
              p: 5,
              textAlign: "center",
              borderRadius: 5,
              boxShadow: 1,
            }}
          >
            <Typography
              color="#0A303A"
              variant="h2"
              fontWeight={600}
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              75%
            </Typography>
            <Typography fontWeight={600}>dogs are first bred</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              p: 5,
              textAlign: "center",
              borderRadius: 5,
              boxShadow: 1,
            }}
          >
            <Typography
              color="#0A303A"
              variant="h2"
              fontWeight={600}
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              45+
            </Typography>
            <Typography fontWeight={600}>Years Of History</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              p: 5,
              textAlign: "center",
              borderRadius: 5,
              boxShadow: 1,
            }}
          >
            <Typography
              color="#0A303A"
              variant="h2"
              fontWeight={600}
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              259+
            </Typography>
            <Typography fontWeight={600}>Most dogs are first</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              p: 5,
              textAlign: "center",
              borderRadius: 5,
              boxShadow: 1,
            }}
          >
            <Typography
              color="#0A303A"
              variant="h2"
              fontWeight={600}
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              39K
            </Typography>
            <Typography fontWeight={600}>Dog Breeding</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default WhyUsSection;
