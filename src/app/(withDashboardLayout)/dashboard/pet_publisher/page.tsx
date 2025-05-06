"use client";

import React from "react";
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useGetAllPublisherQuery, useGetMyCreatredPetQuery, useGetMyPublishedPetQuery } from "@/redux/api/publisherApi";
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

  const petStats = [
    { name: "Created", count: createdCount },
    { name: "Published", count: publishedCount },
  ];

  return (
     <Box sx={{ xs: 2, sm: 2, md: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" mb={4}>
        🐾 Publisher Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Total Publishers */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#f0f8ff" }}>
            <Typography variant="h6">Total Publishers</Typography>
            <Typography variant="h4" fontWeight="bold">{totalPublishers}</Typography>
          </Paper>
        </Grid>

        {/* Created Pets */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#ffe4e1" }}>
            <Typography variant="h6">My Created Pets</Typography>
            <Typography variant="h4" fontWeight="bold">{createdCount}</Typography>
          </Paper>
        </Grid>

        {/* Published Pets */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#e6ffe6" }}>
            <Typography variant="h6">My Published Pets</Typography>
            <Typography variant="h4" fontWeight="bold">{publishedCount}</Typography>
          </Paper>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", bgcolor: "#f9f9f9" }}>
            <Typography variant="h6" gutterBottom>Pet Publishing Activity</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={petStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Created Pets Table */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Created Pets</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="created pets table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pet Name</TableCell>
                    <TableCell align="right">Species</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createdPetData.map((pet: any) => (
                    <TableRow key={pet?.id}>
                      <TableCell>{pet?.name}</TableCell>
                      <TableCell align="right">{pet?.species}</TableCell>
                      <TableCell align="right">{pet?.isPublished ? "Yes": "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Published Pets Table */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Published Pets</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="published pets table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pet Name</TableCell>
                    <TableCell align="right">Species</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myPublishedPetData.map((pet: any) => (
                    <TableRow key={pet?.id}>
                      <TableCell>{pet?.name}</TableCell>
                      <TableCell align="right">{pet?.species}</TableCell>
                      <TableCell align="right">{pet?.isPublished ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublisherPage;
