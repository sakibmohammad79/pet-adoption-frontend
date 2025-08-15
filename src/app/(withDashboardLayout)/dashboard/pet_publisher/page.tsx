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
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Pets,
  PublishOutlined,
  CreateOutlined,
  PeopleOutlined,
  TrendingUp,
  VisibilityOutlined,
  Add,
  Edit,
  Delete,
  Search,
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
  useGetAllPublisherQuery,
  useGetMyCreatredPetQuery,
  useGetMyPublishedPetQuery,
} from "@/redux/api/publisherApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const PublisherPage = () => {
  const { data: profileData, isLoading: loading } = useGetMyProfileQuery({});
  const publisherId = profileData?.profile?.publisher?.id;

  const { data: publishers } = useGetAllPublisherQuery({});
  const publisherData = publishers?.publisher || [];
  const { data: myCreatedPet } = useGetMyCreatredPetQuery(publisherId);
  const createdPetData = myCreatedPet?.pets || [];
  const { data: myPublishedPet } = useGetMyPublishedPetQuery(publisherId);
  const myPublishedPetData = myPublishedPet?.pets || [];

  const createdCount = createdPetData.length;
  const publishedCount = myPublishedPetData.length;
  const totalPublishers = publisherData.length;
  const unpublishedCount = createdCount - publishedCount;

  const petStats = [
    { name: "Created", count: createdCount, fill: "#4ECDC4" },
    { name: "Published", count: publishedCount, fill: "#4CAF50" },
    { name: "Draft", count: unpublishedCount, fill: "#FF9800" },
  ];

  const pieData = [
    { name: "Published", value: publishedCount, color: "#4CAF50" },
    { name: "Draft", value: unpublishedCount, color: "#FF9800" },
  ];

  // Mock data for activity timeline
  const activityData = [
    { month: "Jan", created: 2, published: 1 },
    { month: "Feb", created: 3, published: 2 },
    { month: "Mar", created: 1, published: 1 },
    { month: "Apr", created: createdCount, published: publishedCount },
  ];

  const publisherStats = [
    {
      title: "Total Created Pets",
      value: createdCount,
      icon: <CreateOutlined sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #4ECDC4 0%, #36B5B0 100%)",
      progress: createdCount > 0 ? 90 : 0,
      description: "Pets you've created",
    },
    {
      title: "Published Pets",
      value: publishedCount,
      icon: <PublishOutlined sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
      progress: publishedCount > 0 ? 100 : 0,
      description: "Live and available",
    },
    {
      title: "Community Publishers",
      value: totalPublishers,
      icon: <PeopleOutlined sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
      progress: 75,
      description: "Fellow publishers",
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
            🐾 Publisher Dashboard
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.8)" fontWeight={300}>
            Manage and track your pet publications
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Statistics Cards */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {publisherStats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
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

          {/* Publishing Activity Chart */}
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
                      Publishing Activity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track your pet creation and publishing progress
                    </Typography>
                  </Box>
                </Stack>

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="createdGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="publishedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#666", fontSize: 12 }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="created"
                      stackId="1"
                      stroke="#4ECDC4"
                      fill="url(#createdGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="published"
                      stackId="1"
                      stroke="#4CAF50"
                      fill="url(#publishedGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Publishing Status Breakdown */}
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
                      Publishing Status
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your pet publication breakdown
                    </Typography>
                  </Box>
                </Stack>

                {createdCount > 0 ? (
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
                    <CreateOutlined sx={{ fontSize: 64, color: "#E0E0E0", mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" mb={2}>
                      No pets created yet! Start by creating your first pet listing.
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
                      Create Pet
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Created Pets Table */}
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
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      Created Pets ({createdCount})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      All pets you&apos;ve created
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    sx={{ borderColor: "#4ECDC4", color: "#4ECDC4" }}
                  >
                    Add New
                  </Button>
                </Stack>

                <TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: 400 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>
                          Pet Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>
                          Species
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>
                          Status
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {createdPetData.length > 0 ? (
                        createdPetData.map((pet: any) => (
                          <TableRow key={pet?.id} hover>
                            <TableCell>
                              <Typography fontWeight={500}>{pet?.name}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={pet?.species}
                                size="small"
                                sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={pet?.isPublished ? "Published" : "Draft"}
                                size="small"
                                sx={{
                                  bgcolor: pet?.isPublished ? "#e8f5e8" : "#fff3e0",
                                  color: pet?.isPublished ? "#4caf50" : "#ff9800",
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Stack direction="row" spacing={1} justifyContent="center">
                                <Button size="small" startIcon={<VisibilityOutlined />}>
                                  View
                                </Button>
                                <Button size="small" startIcon={<Edit />}>
                                  Edit
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">
                              No pets created yet
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Published Pets Table */}
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
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      Published Pets ({publishedCount})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Live and available for adoption
                    </Typography>
                  </Box>
                </Stack>

                <TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: 400 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>
                          Pet Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>
                          Species
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>
                          Status
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myPublishedPetData.length > 0 ? (
                        myPublishedPetData.map((pet: any) => (
                          <TableRow key={pet?.id} hover>
                            <TableCell>
                              <Typography fontWeight={500}>{pet?.name}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={pet?.species}
                                size="small"
                                sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label="Published"
                                size="small"
                                sx={{ bgcolor: "#e8f5e8", color: "#4caf50" }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Stack direction="row" spacing={1} justifyContent="center">
                                <Button size="small" startIcon={<VisibilityOutlined />}>
                                  View
                                </Button>
                                <Button size="small" startIcon={<Edit />}>
                                  Edit
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">
                              No published pets yet
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
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
                      startIcon={<Add />}
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
                      Create New Pet
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<PublishOutlined />}
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
                      Publish Drafts
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Search />}
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
                      Browse All Pets
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<TrendingUp />}
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
                      View Analytics
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

export default PublisherPage;