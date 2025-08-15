"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  LinearProgress,
  Divider,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Pets,
  FavoriteOutlined,
  CheckCircleOutlined,
  PeopleOutlined,
  TrendingUp,
  CalendarToday,
  LocationOn,
  Phone,
  Email,
  Star,
  Add,
  Visibility,
  Edit,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  useGetAllAdopterQuery,
  useGetMyAdoptedPetsQuery,
  useGetMyBookedPetsQuery,
} from "@/redux/api/adopterApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const AdopterPage = () => {
  const { data: profileData, isLoading: loading } = useGetMyProfileQuery({});
  const adopterId = profileData?.profile?.adopter?.id;

  const { data: adopters } = useGetAllAdopterQuery({});
  const { data: myBookedPets } = useGetMyBookedPetsQuery(adopterId);
  const { data: myAdoptedPets } = useGetMyAdoptedPetsQuery(adopterId);

  const bookedCount = myBookedPets?.length || 0;
  const adoptedCount = myAdoptedPets?.length || 0;
  const totalAdopters = adopters?.length || 0;

  const adoptionStats = [
    { name: "Booked", count: bookedCount, fill: "#FF9800" },
    { name: "Adopted", count: adoptedCount, fill: "#4CAF50" },
  ];

  const pieData = [
    { name: "Adopted", value: adoptedCount, color: "#4CAF50" },
    { name: "Booked", value: bookedCount, color: "#FF9800" },
  ];

  // Mock data for activity timeline (you can replace with real data)
  const activityData = [
    { month: "Jan", adopted: 0, booked: 1 },
    { month: "Feb", adopted: 1, booked: 0 },
    { month: "Mar", adopted: 0, booked: 2 },
    { month: "Apr", adopted: adoptedCount, booked: bookedCount },
  ];

  const adopterStats = [
    {
      title: "My Booked Pets",
      value: bookedCount,
      icon: <FavoriteOutlined sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)",
      progress: bookedCount > 0 ? 75 : 0,
      description: "Pets you've shown interest in",
    },
    {
      title: "My Adopted Pets",
      value: adoptedCount,
      icon: <CheckCircleOutlined sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
      progress: adoptedCount > 0 ? 100 : 0,
      description: "Your forever companions",
    },
    {
      title: "Community Size",
      value: totalAdopters,
      icon: <PeopleOutlined sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
      progress: 85,
      description: "Fellow pet adopters",
    },
  ];

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header Section with Welcome Message */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 1,
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            🐾 Welcome Back, {profileData?.profile?.name || "Pet Lover"}!
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.8)" fontWeight={300}>
            Your personal adoption journey dashboard
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack alignItems="center" spacing={3}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
                      fontSize: 48,
                    }}
                  >
                    {profileData?.profile?.name?.charAt(0) || "U"}
                  </Avatar>
                  
                  <Box textAlign="center">
                    <Typography variant="h5" fontWeight="bold" color="#2C3E50">
                      {profileData?.profile?.name || "User"}
                    </Typography>
                    <Chip
                      label="Pet Adopter"
                      sx={{
                        bgcolor: "#E8F5E8",
                        color: "#4CAF50",
                        fontWeight: 600,
                        mt: 1,
                      }}
                    />
                  </Box>

                  <Divider sx={{ width: "100%" }} />

                  <Stack spacing={2} width="100%">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Email sx={{ color: "#666", fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {profileData?.profile?.email || "email@example.com"}
                      </Typography>
                    </Stack>
                    
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CalendarToday sx={{ color: "#666", fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        Member since 2024
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    sx={{
                      background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
                      borderRadius: 3,
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                    }}
                    fullWidth
                  >
                    Edit Profile
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Statistics Cards */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {adopterStats.map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    elevation={8}
                    sx={{
                      background: stat.bgGradient,
                      color: "white",
                      borderRadius: 4,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack alignItems="center" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: "rgba(255,255,255,0.2)",
                            width: 64,
                            height: 64,
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        
                        <Box textAlign="center">
                          <Typography variant="h3" fontWeight="bold">
                            {stat.value}
                          </Typography>
                          <Typography variant="h6" fontWeight={500} sx={{ opacity: 0.9 }}>
                            {stat.title}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                            {stat.description}
                          </Typography>
                        </Box>

                        <Box sx={{ width: "100%" }}>
                          <LinearProgress
                            variant="determinate"
                            value={stat.progress}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: "rgba(255,255,255,0.2)",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: "rgba(255,255,255,0.8)",
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Adoption Activity Chart */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: "#4ECDC4", mr: 2 }}>
                    <TrendingUp />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      My Adoption Activity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track your pet adoption journey
                    </Typography>
                  </Box>
                </Stack>

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="adoptedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="bookedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF9800" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FF9800" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#666", fontSize: 12 }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="adopted"
                      stackId="1"
                      stroke="#4CAF50"
                      fill="url(#adoptedGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="booked"
                      stackId="1"
                      stroke="#FF9800"
                      fill="url(#bookedGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Adoption Status Breakdown */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: "#FF6B6B", mr: 2 }}>
                    <Pets />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      Pet Status
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your adoption breakdown
                    </Typography>
                  </Box>
                </Stack>

                {bookedCount + adoptedCount > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    <Stack spacing={2} mt={2}>
                      {pieData.map((status, index) => (
                        <Stack
                          key={index}
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: status.color,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {status.name}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color={status.color}
                          >
                            {status.value}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Pets sx={{ fontSize: 64, color: "#E0E0E0", mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" mb={2}>
                      No pets yet! Start your journey by browsing available pets.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      sx={{
                        background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                      }}
                    >
                      Browse Pets
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" color="#2C3E50" mb={3}>
                  Quick Actions
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Visibility />}
                      sx={{
                        borderColor: "#4ECDC4",
                        color: "#4ECDC4",
                        py: 2,
                        borderRadius: 3,
                        "&:hover": {
                          bgcolor: "#4ECDC420",
                          borderColor: "#4ECDC4",
                        },
                      }}
                    >
                      View My Pets
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Add />}
                      sx={{
                        borderColor: "#FF9800",
                        color: "#FF9800",
                        py: 2,
                        borderRadius: 3,
                        "&:hover": {
                          bgcolor: "#FF980020",
                          borderColor: "#FF9800",
                        },
                      }}
                    >
                      Browse More Pets
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Star />}
                      sx={{
                        borderColor: "#9C27B0",
                        color: "#9C27B0",
                        py: 2,
                        borderRadius: 3,
                        "&:hover": {
                          bgcolor: "#9C27B020",
                          borderColor: "#9C27B0",
                        },
                      }}
                    >
                      Leave Review
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Phone />}
                      sx={{
                        borderColor: "#4CAF50",
                        color: "#4CAF50",
                        py: 2,
                        borderRadius: 3,
                        "&:hover": {
                          bgcolor: "#4CAF5020",
                          borderColor: "#4CAF50",
                        },
                      }}
                    >
                      Contact Support
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdopterPage;