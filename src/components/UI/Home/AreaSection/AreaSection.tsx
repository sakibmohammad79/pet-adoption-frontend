"use client";
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import AdoptionAreaMap from "@/components/Shared/map/AdoptionAreaMap";

const AreaSection = () => {
  return (
    <Box 
      sx={{ 
        py: { xs: 3, sm: 4, md: 6, lg: 8 },
        backgroundColor: { xs: "background.default", md: "grey.50" },
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" }
      }}
    >
      <Container 
        maxWidth="xl"
        sx={{
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          width: "100%"
        }}
      >
        {/* Optional Section Header */}
        <Box 
          textAlign="center" 
          mb={{ xs: 3, sm: 4, md: 5, lg: 6 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: { xs: 600, md: 700 },
              color: "text.primary",
              fontSize: { 
                xs: "1.75rem", 
                sm: "2.25rem", 
                md: "2.75rem", 
                lg: "3.5rem" 
              },
              mb: { xs: 1, sm: 2, md: 3 },
              lineHeight: 1.2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Our Service Area
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: { xs: "100%", sm: "500px", md: "600px", lg: "700px" },
              mx: "auto",
              fontSize: { 
                xs: "0.9rem", 
                sm: "1rem", 
                md: "1.1rem", 
                lg: "1.25rem" 
              },
              lineHeight: { xs: 1.5, md: 1.6 },
              px: { xs: 2, sm: 0 }
            }}
          >
            We provide comprehensive pet adoption services across the greater Chattogram region and surrounding areas
          </Typography>
        </Box>
        
        {/* Map Component */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1
          }}
        >
          <AdoptionAreaMap />
        </Box>
      </Container>
    </Box>
  );
};

export default AreaSection;