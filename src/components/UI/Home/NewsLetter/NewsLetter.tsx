import * as React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

const NewsLetter = () => {
  return (
    <Box sx={{ backgroundColor: "#F6F3EE", pb: { xs: 8, md: 16 } }}>
      <Container>
        <Box
          sx={{
            backgroundColor: "#EE4433",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 4, md: 0 },
            p: { xs: 4, md: 8 },
            borderRadius: 6,
          }}
        >
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h4"
              fontWeight={600}
              mb={1}
              color="white"
              fontSize={{ xs: "1.5rem", sm: "2rem" }}
            >
              Newsletter For
            </Typography>
            <Typography
              color="white"
              fontWeight={600}
              fontSize={{ xs: "0.875rem", sm: "1rem" }}
            >
              * Do Not Show Your Email.
            </Typography>
          </Box>
          {/* email field */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            alignItems="center"
            width="100%"
            maxWidth={{ xs: "100%", sm: 500 }}
          >
            <Box
              component="form"
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                width: "100%",
                bgcolor: "white",
                borderRadius: 2,
              }}
            >
              <InputBase
                sx={{ flex: 1 }}
                placeholder="Enter your email..."
                inputProps={{ "aria-label": "Enter your email..." }}
              />
            </Box>
            <Button
              sx={{
                bgcolor: "white",
                color: "primary.main",
                fontWeight: 600,
                px: { xs: 4, sm: 6 },
                py: 1,
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsLetter;
