"use client";
import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const AdoptionAreaMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const mapContainerStyle = {
    width: "100%",
    height: isSmallScreen ? "300px" : "500px",
    borderRadius: "10px",
  };

  if (loadError)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="error.main"
      >
        Error loading maps
      </Box>
    );

  if (!isLoaded)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Card
      sx={{
        mx: "auto",
        my: isSmallScreen ? 4 : 8,
        p: isSmallScreen ? 1 : 2,
        borderRadius: 3,
        boxShadow: 2,
        maxWidth: isSmallScreen ? "95%" : "100%",
      }}
    >
      <CardContent>
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          color="gray"
          align="center"
          gutterBottom
        >
          Adoption Area
        </Typography>
        <Box sx={{ overflow: "hidden", borderRadius: 2 }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={{ lat: 22.3569, lng: 91.7832 }}
          >
            <Marker position={{ lat: 22.3569, lng: 91.7832 }} />
          </GoogleMap>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdoptionAreaMap;
