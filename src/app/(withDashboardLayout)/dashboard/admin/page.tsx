"use client";

import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetAdminsQuery, useGetAdoptionRequestQuery } from "@/redux/api/adminApi";
import { useGetAllAdopterQuery } from "@/redux/api/adopterApi";
import { useGetAllPublisherQuery } from "@/redux/api/publisherApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

  const chartData = [
    { name: "Admins", count: adminCount },
    { name: "Adopters", count: adopterCount },
    { name: "Publishers", count: publisherCount },
    { name: "Pending Requests", count: pendingRequests },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
        🛠️ Admin Dashboard
      </Typography>

      <Grid container spacing={4} mt={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#d0f0c0" }}>
            <Typography variant="h6">Total Admins</Typography>
            <Typography variant="h4" fontWeight="bold">{adminCount}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#f5e1da" }}>
            <Typography variant="h6">Total Adopters</Typography>
            <Typography variant="h4" fontWeight="bold">{adopterCount}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#e6f7ff" }}>
            <Typography variant="h6">Total Publishers</Typography>
            <Typography variant="h4" fontWeight="bold">{publisherCount}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#fff3cd" }}>
            <Typography variant="h6">Pending Adoptions</Typography>
            <Typography variant="h4" fontWeight="bold">{pendingRequests}</Typography>
          </Paper>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📊 User Stats
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Table */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📝 Recent Adoption Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Adopter</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Pet ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(adoptionRequests?.adoptionRequest?.slice(0, 5) || []).map((req: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell>{req?.adopter?.user?.name || "N/A"}</TableCell>
                      <TableCell>{req?.adoptionStatus}</TableCell>
                      <TableCell>{req?.petId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Summary Panel */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📌 Summary
            </Typography>
            <Typography>Total Adoption Requests: {totalRequests}</Typography>
            <Typography>Pending: {pendingRequests}</Typography>
            <Typography>Admins Active: {adminCount}</Typography>
            <Typography>Users Total: {adopterCount + publisherCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardPage;
