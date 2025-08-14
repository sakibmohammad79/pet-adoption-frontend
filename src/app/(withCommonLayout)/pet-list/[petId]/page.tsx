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
  Card,
  CardContent,
  Chip,
  Avatar,
  Paper,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useBookPetMutation } from "@/redux/api/adopterApi";
import Swal from "sweetalert2";

const PetDetailsPage = ({ params }: any) => {
  const { data, isLoading } = useGetSinglePetsQuery(params.petId);
  const { data: userData } = useGetMyProfileQuery({});
  const profileData = userData?.profile;
  const adopterId = profileData?.adopter?.id;
  const [bookPet] = useBookPetMutation();

  const handleBookPet = async (petId: string) => {
    if (!adopterId) {
      Swal.fire({
        icon: "error",
        title: "Registration Required!",
        text: "Please register as an adopter to book a pet.",
      });
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to book this pet?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await bookPet({ adopterId: adopterId, petId: petId });
      } catch (err: any) {
        console.log(err);
      }
      Swal.fire("Booked!", "Pet Book!.", "success");
    } else {
      Swal.fire("Cancelled", "Pet not booked! :)", "info");
    }
  };

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "80vh" 
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 4, 
            overflow: "hidden", 
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            position: "relative"
          }}
        >
          <Box sx={{ p: 4, position: "relative", zIndex: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                <PetsIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h3" component="h1" fontWeight="bold" mb={1}>
                  {data?.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="h6" >
                    {data?.location}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip 
                label={data?.breed} 
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }} 
              />
              <Chip 
                label={`${data?.age} old`} 
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }} 
              />
              <Chip 
                label={data?.gender} 
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }} 
              />
              {data?.isAdopt && (
                <Chip 
                  label="Adopted" 
                  color="success" 
                  sx={{ bgcolor: "rgba(76, 175, 80, 0.8)" }}
                />
              )}
              {data?.isBooked && !data?.isAdopt && (
                <Chip 
                  label="Booked" 
                  color="warning" 
                  sx={{ bgcolor: "rgba(255, 152, 0, 0.8)" }}
                />
              )}
            </Stack>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} md={7}>
            <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
              <Box sx={{ position: "relative", height: 400 }}>
                <Image
                  fill
                  src={data?.image}
                  alt={`${data?.name} - Pet for adoption`}
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Card>

            {/* About Section */}
            <Card elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <InfoIcon />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" color="primary.main">
                    About {data?.name}
                  </Typography>
                </Stack>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
                  {data?.description || "This lovely pet is looking for a caring home where they can bring joy and companionship. They are healthy, well-socialized, and ready to become a beloved family member."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pet Information Sidebar */}
          <Grid item xs={12} md={5}>
            <Card elevation={2} sx={{ borderRadius: 3, mb: 3, position: "sticky", top: 20 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <FavoriteIcon />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" color="secondary.main">
                    Pet Details
                  </Typography>
                </Stack>

                <Stack spacing={3}>
                  {[
                    { label: "Name", value: data?.name },
                    { label: "Age", value: data?.age },
                    { label: "Color", value: data?.color },
                    { label: "Gender", value: data?.gender },
                    { label: "Size", value: data?.size },
                    { label: "Breed", value: data?.breed },
                    { label: "Location", value: data?.location },
                    { label: "Health Status", value: data?.healthStatus },
                  ].map((item, index) => (
                    <Box key={index}>
                      <Stack 
                        direction="row" 
                        justifyContent="space-between" 
                        alignItems="center"
                        sx={{ 
                          p: 2, 
                          bgcolor: "grey.50", 
                          borderRadius: 2,
                          transition: "all 0.2s ease",
                          "&:hover": { bgcolor: "grey.100" }
                        }}
                      >
                        <Typography variant="body1" fontWeight="600" color="text.primary">
                          {item.label}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          fontWeight="bold" 
                          color="primary.main"
                          sx={{ textAlign: "right", flex: 1, ml: 2 }}
                        >
                          {item.value}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Action Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={data?.isAdopt || data?.isBooked}
                  onClick={() => handleBookPet(data?.id)}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    background: data?.isAdopt || data?.isBooked 
                      ? "grey.300" 
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background: data?.isAdopt || data?.isBooked 
                        ? "grey.300" 
                        : "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                  startIcon={<PetsIcon />}
                >
                  {data?.isAdopt 
                    ? "Already Adopted" 
                    : data?.isBooked 
                    ? "Already Booked" 
                    : "Apply for Adoption"
                  }
                </Button>

                {!data?.isAdopt && !data?.isBooked && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    textAlign="center" 
                    sx={{ mt: 2 }}
                  >
                    Ready to give {data?.name} a loving home? Click above to start the adoption process!
                  </Typography>
                )}
              </CardContent>
            </Card>

            {/* Health Status Card */}
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 3,
                bgcolor: data?.healthStatus?.toLowerCase() === "healthy" ? "success.50" : "warning.50",
                border: `2px solid ${data?.healthStatus?.toLowerCase() === "healthy" ? "success.200" : "warning.200"}`
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Avatar 
                  sx={{ 
                    bgcolor: data?.healthStatus?.toLowerCase() === "healthy" ? "success.main" : "warning.main",
                    width: 56, 
                    height: 56, 
                    mx: "auto", 
                    mb: 2 
                  }}
                >
                  <FavoriteIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  Health Status
                </Typography>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  color={data?.healthStatus?.toLowerCase() === "healthy" ? "success.main" : "warning.main"}
                >
                  {data?.healthStatus}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PetDetailsPage;