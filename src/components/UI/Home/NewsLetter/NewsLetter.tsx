import * as React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

const NewsLetter = () => {
  return (
    <Box sx={{ backgroundColor: "#F6F3EE", pb: 16 }}>
      <Container>
        <Box
          sx={{
            backgroundColor: "#EE4433",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            p: 8,
            borderRadius: 6,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={600} mb={1} color="white">
              Newsletter For
            </Typography>
            <Typography color="white" fontWeight={600}>
              * Do Not Show Your Email.
            </Typography>
          </Box>
          {/* email field */}
          <Box display="flex" gap={2}>
            <Box
              component="form"
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                width: 400,
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
            <Box>
              <Button
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsLetter;