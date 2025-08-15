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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip as MuiTooltip,
  Paper,
} from "@mui/material";
import {
  AdminPanelSettings,
  People,
  Publish,
  Pending,
  CheckCircle,
  Cancel,
  TrendingUp,
  PersonAdd,
  Assignment,
  Visibility,
  MoreVert,
  Dashboard,
  Analytics,
  Settings,
} from "@mui/icons-material";
import { useGetAdminsQuery, useGetAdoptionRequestQuery } from "@/redux/api/adminApi";
import { useGetAllAdopterQuery } from "@/redux/api/adopterApi";
import { useGetAllPublisherQuery } from "@/redux/api/publisherApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, CartesianGrid } from "recharts";

const AdminDashboardPage = () => {
  const { data: admins } = useGetAdminsQuery({});
  const { data: adopters } = useGetAllAdopterQuery({});
  const { data: publishers } = useGetAllPublisherQuery({});
  const { data: adoptionRequests } = useGetAdoptionRequestQuery({});
  
  const adminCount = admins?.admins?.length || 0;
  const adopterCount = adopters?.length || 0;
  const publisherCount = publishers?.publisher?.length || 0;

  const totalRequests = adoptionRequests?.adoptionRequest?.length || 0;
  const pendingRequests = adoptionRequests?.adoptionRequest?.filter(
    (req: any) => req.adoptionStatus === "PENDING"
  ).length || 0;
  const approvedRequests = adoptionRequests?.adoptionRequest?.filter(
    (req: any) => req.adoptionStatus === "APPROVED"
  ).length || 0;
  const rejectedRequests = adoptionRequests?.adoptionRequest?.filter(
    (req: any) => req.adoptionStatus === "REJECTED"
  ).length || 0;

  const chartData = [
    { name: "Admins", count: adminCount, fill: "#9B59B6" },
    { name: "Adopters", count: adopterCount, fill: "#4ECDC4" },
    { name: "Publishers", count: publisherCount, fill: "#45B7D1" },
    { name: "Pending", count: pendingRequests, fill: "#FF9800" },
  ];

  const statusData = [
    { name: "Approved", value: approvedRequests, color: "#4CAF50" },
    { name: "Pending", value: pendingRequests, color: "#FF9800" },
    { name: "Rejected", value: rejectedRequests, color: "#F44336" },
  ];

  // Admin stats cards data
  const adminStats = [
    {
      title: "Total Admins",
      value: adminCount,
      icon: <AdminPanelSettings sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)",
      progress: 100,
      change: "+2",
      changeType: "positive",
    },
    {
      title: "Active Adopters",
      value: adopterCount,
      icon: <People sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)",
      progress: 85,
      change: "+12",
      changeType: "positive",
    },
    {
      title: "Publishers",
      value: publisherCount,
      icon: <Publish sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #45B7D1 0%, #96C93D 100%)",
      progress: 78,
      change: "+5",
      changeType: "positive",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      icon: <Pending sx={{ fontSize: 40 }} />,
      bgGradient: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)",
      progress: 65,
      change: "-3",
      changeType: "negative",
    },
  ];

  const getStatusChip = (status: string) => {
    const statusConfig = {
      PENDING: { color: "#FF9800", bg: "#FFF3E0", label: "Pending" },
      APPROVED: { color: "#4CAF50", bg: "#E8F5E8", label: "Approved" },
      REJECTED: { color: "#F44336", bg: "#FFEBEE", label: "Rejected" },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    
    return (
      <Chip
        label={config.label}
        size="small"
        sx={{
          bgcolor: config.bg,
          color: config.color,
          fontWeight: 600,
          border: `1px solid ${config.color}20`,
        }}
      />
    );
  };

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
            🛠️ Admin Control Center
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.8)" fontWeight={300}>
            Monitor and manage your pet adoption platform
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Admin Stats Cards */}
          {adminStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={8}
                sx={{
                  background: stat.bgGradient,
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
                        {stat.title}
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {stat.value}
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
                      {stat.icon}
                    </Avatar>
                  </Stack>
                  
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        opacity: 0.9,
                        color: stat.changeType === "positive" ? "#E8F5E8" : "#FFEBEE"
                      }}
                    >
                      {stat.change} this month
                    </Typography>
                    <TrendingUp sx={{ fontSize: 20, opacity: 0.8 }} />
                  </Stack>
                  
                  <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Activity
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {stat.progress}%
                      </Typography>
                    </Stack>
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
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* User Statistics Chart */}
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
                <Stack direction="row" alignItems="center" justifyContent="between" mb={3}>
                  <Stack direction="row" alignItems="center">
                    <Avatar sx={{ bgcolor: "#45B7D1", mr: 2 }}>
                      <Analytics />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight="bold" color="#2C3E50">
                        Platform Analytics
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        User distribution and activity metrics
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#45B7D1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#45B7D1" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#666', fontSize: 12 }}
                      axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <YAxis 
                      tick={{ fill: '#666', fontSize: 12 }}
                      axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <Tooltip />
                    <Bar 
                      dataKey="count" 
                      radius={[8, 8, 0, 0]} 
                      fill="url(#barGradient)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Request Status Distribution */}
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
                  <Avatar sx={{ bgcolor: "#FF9800", mr: 2 }}>
                    <Assignment />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      Request Status
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current adoption requests
                    </Typography>
                  </Box>
                </Stack>

                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <Stack spacing={2} mt={2}>
                  {statusData.map((status, index) => (
                    <Stack key={index} direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: status.color 
                          }} 
                        />
                        <Typography variant="body2" color="text.secondary">
                          {status.name}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" fontWeight="bold" color={status.color}>
                        {status.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Adoption Requests Table */}
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
                <Stack direction="row" alignItems="center" justifyContent="between" mb={3}>
                  <Stack direction="row" alignItems="center">
                    <Avatar sx={{ bgcolor: "#4ECDC4", mr: 2 }}>
                      <Dashboard />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                        Recent Adoption Requests
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Latest 5 adoption applications
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#F8F9FA' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Adopter ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Pet ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2C3E50' }} align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(adoptionRequests?.adoptionRequest?.slice(0, 5) || []).map((req: any, idx: number) => (
                        <TableRow 
                          key={idx} 
                          sx={{ 
                            '&:hover': { bgcolor: '#F8F9FA' },
                            '&:last-child td, &:last-child th': { border: 0 }
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {req?.adopterId || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {req?.petId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getStatusChip(req?.adoptionStatus)}
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              <MuiTooltip title="View Details">
                                <IconButton size="small" sx={{ color: '#45B7D1' }}>
                                  <Visibility fontSize="small" />
                                </IconButton>
                              </MuiTooltip>
                              <MuiTooltip title="More Options">
                                <IconButton size="small" sx={{ color: '#666' }}>
                                  <MoreVert fontSize="small" />
                                </IconButton>
                              </MuiTooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Summary Panel */}
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
                  <Avatar sx={{ bgcolor: "#9B59B6", mr: 2 }}>
                    <Settings />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#2C3E50">
                      Platform Summary
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Key metrics overview
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={3}>
                  <Box sx={{ p: 3, bgcolor: '#E3F2FD', borderRadius: 2, border: '1px solid #BBDEFB' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Total Requests
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="#1976D2">
                          {totalRequests}
                        </Typography>
                      </Box>
                      <Assignment sx={{ fontSize: 32, color: '#1976D2' }} />
                    </Stack>
                  </Box>

                  <Box sx={{ p: 3, bgcolor: '#E8F5E8', borderRadius: 2, border: '1px solid #C8E6C9' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Active Users
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="#4CAF50">
                          {adopterCount + publisherCount}
                        </Typography>
                      </Box>
                      <PersonAdd sx={{ fontSize: 32, color: '#4CAF50' }} />
                    </Stack>
                  </Box>

                  <Box sx={{ p: 3, bgcolor: '#FFF3E0', borderRadius: 2, border: '1px solid #FFE0B2' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Success Rate
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="#FF9800">
                          {totalRequests > 0 ? Math.round((approvedRequests / totalRequests) * 100) : 0}%
                        </Typography>
                      </Box>
                      <TrendingUp sx={{ fontSize: 32, color: '#FF9800' }} />
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;