"use client";
import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
  Grid,
  Stack,
  Chip,
  Avatar
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import InfoIcon from "@mui/icons-material/Info";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";

const AdoptionAreaMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Dynamic map height based on screen size
  const getMapHeight = () => {
    if (isXs) return "250px";
    if (isSm) return "300px";
    if (isMd) return "400px";
    return "500px";
  };

  // Dynamic zoom level based on screen size
  const getZoomLevel = () => {
    if (isXs) return 9;
    if (isSm) return 10;
    if (isMd) return 11;
    return 12;
  };

  const mapContainerStyle = {
    width: "100%",
    height: getMapHeight(),
    borderRadius: isMobile ? "8px" : "12px",
  };

  // Enhanced loading state
  if (loadError)
    return (
      <Paper
        elevation={isMobile ? 1 : 2}
        sx={{
          p: { xs: 3, sm: 4, md: 5, lg: 6 },
          mx: "auto",
          maxWidth: { xs: "100%", sm: "600px", md: "800px", lg: "900px" },
          mt: { xs: 2, sm: 3, md: 4 },
          textAlign: "center",
          borderRadius: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: { xs: 50, sm: 60, md: 70 },
              height: { xs: 50, sm: 60, md: 70 },
              bgcolor: "error.light"
            }}
          >
            <MapIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: "error.main" }} />
          </Avatar>
          <Typography 
            variant="h6" 
            color="error.main"
            sx={{ 
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              fontWeight: 600 
            }}
          >
            Unable to Load Map
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: "0.875rem", sm: "1rem" },
              maxWidth: { xs: "280px", sm: "400px", md: "500px" },
              lineHeight: 1.6
            }}
          >
            Please check your internet connection and try again. Our adoption center is located in the heart of Chattogram, Bangladesh.
          </Typography>
        </Stack>
      </Paper>
    );

  if (!isLoaded)
    return (
      <Paper
        elevation={isMobile ? 1 : 2}
        sx={{
          p: { xs: 4, sm: 5, md: 6, lg: 8 },
          mx: "auto",
          maxWidth: { xs: "100%", sm: "600px", md: "800px", lg: "900px" },
          mt: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <CircularProgress 
          size={isMobile ? 40 : 50} 
          thickness={4}
          sx={{ color: "primary.main" }}
        />
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" } }}
        >
          Loading interactive map...
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          Please wait while we prepare your location details
        </Typography>
      </Paper>
    );

  return (
    <Paper
      elevation={isMobile ? 1 : 2}
      sx={{
        mx: "auto",
        my: { xs: 2, sm: 3, md: 4 },
        maxWidth: { 
          xs: "100%", 
          sm: "100%", 
          md: "900px", 
          lg: "1100px", 
          xl: "1200px" 
        },
        backgroundColor: "background.paper",
        borderRadius: { xs: 2, sm: 3, md: 4 },
        overflow: "hidden",
        boxShadow: { 
          xs: "0 2px 8px rgba(0,0,0,0.1)", 
          md: "0 4px 20px rgba(0,0,0,0.15)" 
        }
      }}
    >
      {/* Document Header */}
      <Box sx={{ 
        p: { xs: 3, sm: 4, md: 5, lg: 6 }, 
        pb: { xs: 2, sm: 3, md: 4 },
        background: { xs: "transparent", md: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)" }
      }}>
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          alignItems={{ xs: "center", sm: "flex-start" }} 
          spacing={{ xs: 2, sm: 3 }} 
          mb={{ xs: 2, sm: 3, md: 4 }}
        >
          <Avatar
            sx={{
              width: { xs: 50, sm: 60, md: 70 },
              height: { xs: 50, sm: 60, md: 70 },
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
            }}
          >
            <LocationOnIcon 
              sx={{ 
                fontSize: { xs: 28, sm: 32, md: 36 }, 
                color: "white" 
              }} 
            />
          </Avatar>
          <Box sx={{ textAlign: { xs: "center", sm: "left" }, flex: 1 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: { xs: 600, md: 700 },
                color: "text.primary",
                mb: { xs: 1, sm: 2 },
                fontSize: { 
                  xs: "1.5rem", 
                  sm: "1.75rem", 
                  md: "2rem", 
                  lg: "2.25rem" 
                },
                lineHeight: 1.2
              }}
            >
              Service Area Coverage
            </Typography>
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              spacing={1} 
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <Chip 
                label="Chattogram Region" 
                color="primary" 
                variant="filled"
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)"
                }}
              />
              <Chip 
                label="25km Radius" 
                color="success" 
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{ fontWeight: 500 }}
              />
            </Stack>
          </Box>
        </Stack>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ 
            lineHeight: 1.7,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            textAlign: { xs: "center", sm: "left" },
            maxWidth: { md: "85%" }
          }}
        >
          Our comprehensive pet adoption services cover the entire Chattogram metropolitan area and surrounding regions. 
          We&apos;re dedicated to connecting loving families with pets throughout this vibrant coastal city and beyond.
        </Typography>
      </Box>

      <Divider sx={{ mx: { xs: 3, sm: 4, md: 5, lg: 6 } }} />

      {/* Map Section */}
      <Box sx={{ p: { xs: 3, sm: 4, md: 5, lg: 6 } }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={2} 
          mb={{ xs: 2, sm: 3, md: 4 }}
        >
          <MapIcon 
            sx={{ 
              color: "primary.main", 
              fontSize: { xs: 20, sm: 24, md: 28 } 
            }} 
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{ 
              fontWeight: 600, 
              color: "text.primary",
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" }
            }}
          >
            Interactive Location Map
          </Typography>
        </Stack>
        
        <Card
          variant="outlined"
          sx={{
            overflow: "hidden",
            backgroundColor: "grey.50",
            border: "2px solid",
            borderColor: "divider",
            borderRadius: { xs: 2, sm: 3, md: 4 },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              borderColor: "primary.light",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              transform: { xs: "none", md: "translateY(-2px)" }
            }
          }}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={getZoomLevel()}
            center={{ lat: 22.3569, lng: 91.7832 }}
            options={{
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: isMobile ? "off" : "simplified" }],
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [{ color: "#ffffff" }]
                },
                {
                  featureType: "landscape",
                  elementType: "geometry",
                  stylers: [{ color: "#f8f9fa" }]
                }
              ],
              disableDefaultUI: isXs,
              zoomControl: true,
              streetViewControl: !isMobile,
              mapTypeControl: isLg,
              fullscreenControl: !isXs,
              gestureHandling: isMobile ? "cooperative" : "auto",
              zoomControlOptions: {
                position: isMobile ? 9 : 3
              }
            }}
          >
            <Marker 
              position={{ lat: 22.3569, lng: 91.7832 }}
              title="Pet Adoption Center - Chattogram"
              // animation={2}
            />
          </GoogleMap>
        </Card>

        {/* Enhanced Information Grid */}
        <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: { xs: 2, sm: 3 },
                  textAlign: "center",
                  height: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", md: "translateY(-4px)" }
                  }
                }}
              >
                <LocationOnIcon 
                  sx={{ 
                    fontSize: { xs: 28, sm: 32, md: 36 }, 
                    mb: { xs: 1, md: 1.5 } 
                  }} 
                />
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    mb: 0.5 
                  }}
                >
                  Primary Location
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    opacity: 0.9 
                  }}
                >
                  Chattogram, Bangladesh
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                  color: "white",
                  borderRadius: { xs: 2, sm: 3 },
                  textAlign: "center",
                  height: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", md: "translateY(-4px)" }
                  }
                }}
              >
                <MyLocationIcon 
                  sx={{ 
                    fontSize: { xs: 28, sm: 32, md: 36 }, 
                    mb: { xs: 1, md: 1.5 } 
                  }} 
                />
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    mb: 0.5 
                  }}
                >
                  Service Radius
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    opacity: 0.9 
                  }}
                >
                  25km from city center
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  background: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
                  color: "white",
                  borderRadius: { xs: 2, sm: 3 },
                  textAlign: "center",
                  height: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", md: "translateY(-4px)" }
                  }
                }}
              >
                <InfoIcon 
                  sx={{ 
                    fontSize: { xs: 28, sm: 32, md: 36 }, 
                    mb: { xs: 1, md: 1.5 } 
                  }} 
                />
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    mb: 0.5 
                  }}
                >
                  Coverage Area
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    opacity: 0.9 
                  }}
                >
                  Greater Chattogram Metro
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  background: "linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)",
                  color: "white",
                  borderRadius: { xs: 2, sm: 3 },
                  textAlign: "center",
                  height: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", md: "translateY(-4px)" }
                  }
                }}
              >
                <HomeIcon 
                  sx={{ 
                    fontSize: { xs: 28, sm: 32, md: 36 }, 
                    mb: { xs: 1, md: 1.5 } 
                  }} 
                />
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    mb: 0.5 
                  }}
                >
                  Home Visits
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    opacity: 0.9 
                  }}
                >
                  Within 15km radius
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Detailed Service Information */}
        <Box 
          sx={{ 
            mt: { xs: 4, sm: 5, md: 6 }, 
            p: { xs: 3, sm: 4, md: 5 }, 
            background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
            borderRadius: { xs: 3, md: 4 },
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={2} 
            mb={{ xs: 2, sm: 3, md: 4 }}
          >
            <Avatar
              sx={{
                width: { xs: 40, sm: 45, md: 50 },
                height: { xs: 40, sm: 45, md: 50 },
                bgcolor: "primary.main"
              }}
            >
              <InfoIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
            </Avatar>
            <Typography 
              variant="h6" 
              color="text.primary" 
              fontWeight={600}
              sx={{ 
                fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" }
              }}
            >
              🏠 Comprehensive Service Details
            </Typography>
          </Stack>
          
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign={{ xs: "center", md: "left" }} p={1}>
                <Typography 
                  variant="subtitle2" 
                  color="primary.main"
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    mb: 0.5
                  }}
                >
                  🚗 Home Visits
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                >
                  Available within 15km radius
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign={{ xs: "center", md: "left" }} p={1}>
                <Typography 
                  variant="subtitle2" 
                  color="primary.main"
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    mb: 0.5
                  }}
                >
                  🚚 Pet Delivery
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                >
                  Safe transport service available
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign={{ xs: "center", md: "left" }} p={1}>
                <Typography 
                  variant="subtitle2" 
                  color="primary.main"
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    mb: 0.5
                  }}
                >
                  🔄 Follow-up Support
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                >
                  Post-adoption care included
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign={{ xs: "center", md: "left" }} p={1}>
                <Typography 
                  variant="subtitle2" 
                  color="primary.main"
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    mb: 0.5
                  }}
                >
                  🏥 Emergency Care
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                >
                  24/7 veterinary referrals
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdoptionAreaMap;