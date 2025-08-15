
"use client";

import React from "react";
import { Box, Grid, Paper, Typography, Card, CardContent, Avatar, Stack, LinearProgress } from "@mui/material";
import { useGetAdminsQuery, useGetAdoptionRequestQuery } from "@/redux/api/adminApi";
import { useGetAllAdopterQuery } from "@/redux/api/adopterApi";
import { useGetPetsQuery } from "@/redux/api/petApi";
import { useGetAllPublisherQuery } from "@/redux/api/publisherApi";
import { useGetAllReviewQuery } from "@/redux/api/reviewApi";
import {
  Pets,
  People,
  AdminPanelSettings,
  Publish,
  TrendingUp,
  CheckCircle,
  Pending,
  Cancel,
  Star,
  RateReview,
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
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const DashboardPage = () => {
  const { data: petData } = useGetPetsQuery({});
  const petDatas = petData?.pets || [];

  const { data: adopters } = useGetAllAdopterQuery({});
  const { data: admins } = useGetAdminsQuery({});
  const adminDatas = admins?.admins || [];

  const { data: publishers } = useGetAllPublisherQuery({});
  const publisherDatas = publishers?.publisher || [];

  const { data: adoptions } = useGetAdoptionRequestQuery({});
  const adoptionRequestDatas = adoptions?.adoptionRequest || [];

  const { data: reviews } = useGetAllReviewQuery({});

  const publishedReviews = reviews?.filter((r: any) => r?.isPublished).length || 0;
  const unpublishedReviews = (reviews?.length || 0) - publishedReviews;

  const reviewChartData = [
    { name: "Published", count: publishedReviews },
    { name: "Unpublished", count: unpublishedReviews },
  ];

  const approvedAdoptions = adoptionRequestDatas.filter(
    (adopt: any) => adopt.adoptionStatus === "APPROVED"
  );
  const pendingAdoptions = adoptionRequestDatas.filter(
    (adopt: any) => adopt.adoptionStatus === "PENDING"
  );
  const rejectedAdoptions = adoptionRequestDatas.filter(
    (adopt: any) => adopt.adoptionStatus === "REJECTED"
  );

  const petSpeciesData = ["DOG", "CAT", "BIRD", "RABBIT"].map((species) => ({
    species,
    count: petDatas.filter((pet: any) => pet.species === species).length,
    fill: species === "DOG" ? "#FF6B6B" : species === "CAT" ? "#4ECDC4" : species === "BIRD" ? "#45B7D1" : "#96CEB4"
  }));

  const adoptionStatusData = [
    { name: "Approved", value: approvedAdoptions.length, color: "#4CAF50" },
    { name: "Pending", value: pendingAdoptions.length, color: "#FF9800" },
    { name: "Rejected", value: rejectedAdoptions.length, color: "#F44336" },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: "Total Pets",
      value: petDatas.length,
      icon: <Pets sx={{ fontSize: 40 }} />,
      color: "#FF6B6B",
      bgGradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
      progress: 85,
    },
    {
      title: "Total Adopters",
      value: adopters?.length || 0,
      icon: <People sx={{ fontSize: 40 }} />,
      color: "#4ECDC4",
      bgGradient: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)",
      progress: 92,
    },
    {
      title: "Publishers",
      value: publisherDatas.length,
      icon: <Publish sx={{ fontSize: 40 }} />,
      color: "#45B7D1",
      bgGradient: "linear-gradient(135deg, #45B7D1 0%, #96C93D 100%)",
      progress: 78,
    },
    {
      title: "Admins",
      value: adminDatas.length,
      icon: <AdminPanelSettings sx={{ fontSize: 40 }} />,
      color: "#9B59B6",
      bgGradient: "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)",
      progress: 100,
    },
  ];

  const adoptionInsights = [
    {
      label: "Approved",
      value: approvedAdoptions.length,
      icon: <CheckCircle sx={{ color: "#4CAF50" }} />,
      color: "#4CAF50",
    },
    {
      label: "Pending",
      value: pendingAdoptions.length,
      icon: <Pending sx={{ color: "#FF9800" }} />,
      color: "#FF9800",
    },
    {
      label: "Rejected",
      value: rejectedAdoptions.length,
      icon: <Cancel sx={{ color: "#F44336" }} />,
      color: "#F44336",
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
        }
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header Section */}
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
            🐾 Pet Adoption Dashboard
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.8)" fontWeight={300}>
            Monitor your pet adoption center&apos;s performance and insights
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Stats Cards */}
          {statsCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={8}
                sx={{
                  background: card.bgGradient,
                  color: "white",
                  borderRadius: 4,
                  overflow: "visible",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box>
                      <Typography variant="h6" fontWeight={500} sx={{ opacity: 0.9 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {card.value}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 64,
                        height: 64,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {card.icon}
                    </Avatar>
                  </Stack>
                  <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Performance
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {card.progress}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={card.progress}
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
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Pet Species Distribution */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: "#FF6B6B", mr: 2 }}>
                    <Pets />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" color="#2C3E50">
                      Pet Species Distribution
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current available pets by species
                    </Typography>
                  </Box>
                </Stack>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={petSpeciesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorDog" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="colorCat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis 
                      dataKey="species" 
                      tick={{ fill: '#666', fontSize: 12 }}
                      axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <YAxis 
                      tick={{ fill: '#666', fontSize: 12 }}
                      axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      radius={[8, 8, 0, 0]} 
                      fill="#FF6B6B"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Adoption Status Summary */}
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
                  <Avatar sx={{ bgcolor: "#4ECDC4", mr: 2 }}>
                    <TrendingUp />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      Adoption Insights
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current status breakdown
                    </Typography>
                  </Box>
                </Stack>
                
                <Stack spacing={3}>
                  {adoptionInsights.map((insight, index) => (
                    <Box key={index}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {insight.icon}
                          <Typography variant="body1" fontWeight={500}>
                            {insight.label}
                          </Typography>
                        </Stack>
                        <Typography variant="h6" fontWeight="bold" color={insight.color}>
                          {insight.value}
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={(insight.value / adoptionRequestDatas.length) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: `${insight.color}20`,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: insight.color,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Stack>

                <Box mt={4} p={3} sx={{ bgcolor: "#F8F9FA", borderRadius: 3 }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Total Adoption Requests
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" textAlign="center" color="#2C3E50">
                    {adoptionRequestDatas.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Adoption Status Pie Chart */}
          <Grid item xs={12} md={6}>
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
                  <Avatar sx={{ bgcolor: "#45B7D1", mr: 2 }}>
                    <CheckCircle />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      Adoption Status Distribution
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visual breakdown of all adoption requests
                    </Typography>
                  </Box>
                </Stack>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={adoptionStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {adoptionStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Review Analytics */}
          <Grid item xs={12} md={6}>
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
                  <Avatar sx={{ bgcolor: "#9B59B6", mr: 2 }}>
                    <RateReview />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      Review Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Published vs unpublished reviews
                    </Typography>
                  </Box>
                </Stack>

                <Grid container spacing={2} mb={3}>
                  <Grid item xs={6}>
                    <Box textAlign="center" p={2} sx={{ bgcolor: "#E8F5E8", borderRadius: 2 }}>
                      <Star sx={{ color: "#4CAF50", fontSize: 32, mb: 1 }} />
                      <Typography variant="h4" fontWeight="bold" color="#4CAF50">
                        {publishedReviews}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Published
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box textAlign="center" p={2} sx={{ bgcolor: "#FFF3E0", borderRadius: 2 }}>
                      <Pending sx={{ color: "#FF9800", fontSize: 32, mb: 1 }} />
                      <Typography variant="h4" fontWeight="bold" color="#FF9800">
                        {unpublishedReviews}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pending
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={reviewChartData}>
                    <defs>
                      <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9B59B6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9B59B6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#9B59B6"
                      fillOpacity={1}
                      fill="url(#colorReview)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;