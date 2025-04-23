"use client";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { deepPurple } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";

// Helper to format date
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PetAdopterProfile = () => {
  const { data: adopterData, isLoading } = useGetMyProfileQuery({});
  const profile = adopterData?.profile;
  console.log(profile);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f9fafb",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">No profile data found.</Typography>
      </Box>
    );
  }

  const fullName = `${profile?.adopter?.firstName || ""} ${profile?.adopter?.lastName || ""}`;
  const birthDate = profile?.adopter?.birthDate
    ? formatDate(profile?.adopter?.birthDate)
    : "N/A";
  const createdAt = formatDate(profile?.adopter?.createdAt);
  const updatedAt = formatDate(profile?.adopter?.updatedAt);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        py: 8,
        px: { xs: 3, md: 12 },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 4,
          boxShadow: 4,
          p: { xs: 4, md: 6 },
          maxWidth: "1300px",
          mx: "auto",
        }}
      >
        <Grid container spacing={6}>
          {/* Avatar + Basic Info */}
          <Grid item xs={12} md={4} textAlign="center">
            {profile?.adopter?.profilePhoto ? (
              <Avatar
                alt={fullName}
                src={profile?.adopter?.profilePhoto}
                sx={{ width: 150, height: 150, mx: "auto" }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: deepPurple[500],
                  fontSize: 48,
                  mx: "auto",
                }}
              >
                {profile?.adopter?.firstName?.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Typography variant="h4" fontWeight={700} mt={3}>
              {fullName}
            </Typography>
            <Typography variant="h6" color="textSecondary" mt={1}>
              Role:{" "}
              <span style={{ color: "#FF6B00" }}>{profile?.role}</span>
            </Typography>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {[
                { label: "Email", value: profile?.email },
                { label: "Contact Number", value: profile?.adopter?.contactNumber },
                { label: "Gender", value: profile?.adopter?.gender },
                { label: "Birth Date", value: birthDate },
                { label: "Address", value: profile?.adopter?.address },
                {
                  label: "Account Status",
                  value: profile?.status,
                  color: profile?.status === "ACTIVE" ? "green" : "red",
                },
                { label: "Created At", value: createdAt },
                { label: "Last Updated", value: updatedAt },
              ].map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 2,
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      fontWeight={500}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={item.color || "#1e293b"}
                      mt={0.5}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Update Button */}
        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            size="large"
            startIcon={<EditIcon />}
            sx={{
              backgroundColor: "#FF6B00",
              fontWeight: 600,
              fontSize: 16,
              px: 3,
              py: 1.4,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(255, 107, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#e45f00",
              },
            }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PetAdopterProfile;
