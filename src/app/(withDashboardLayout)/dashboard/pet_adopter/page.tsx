"use client";

import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useGetAllAdopterQuery, useGetMyAdoptedPetsQuery, useGetMyBookedPetsQuery } from "@/redux/api/adopterApi";
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
    { name: "Booked", count: bookedCount },
    { name: "Adopted", count: adoptedCount },
  ];

  return (
     <Box sx={{ xs: 2, sm: 2, md: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" mb={4}>
        🐾 Adopter Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Total Adopters */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#f0f8ff" }}>
            <Typography variant="h6">Total Adopters</Typography>
            <Typography variant="h4" fontWeight="bold">{totalAdopters}</Typography>
          </Paper>
        </Grid>

        {/* My Booked Pets */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#fff0f5" }}>
            <Typography variant="h6">My Booked Pets</Typography>
            <Typography variant="h4" fontWeight="bold">{bookedCount}</Typography>
          </Paper>
        </Grid>

        {/* My Adopted Pets */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#e6ffe6" }}>
            <Typography variant="h6">My Adopted Pets</Typography>
            <Typography variant="h4" fontWeight="bold">{adoptedCount}</Typography>
          </Paper>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#f9f9f9" }}>
            <Typography variant="h6" gutterBottom>My Adoption Activity</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adoptionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdopterPage;
