"use client";

import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useGetAdminsQuery, useGetAdoptionRequestQuery } from "@/redux/api/adminApi";
import { useGetAllAdopterQuery } from "@/redux/api/adopterApi";
import { useGetPetsQuery } from "@/redux/api/petApi";
import { useGetAllPublisherQuery } from "@/redux/api/publisherApi";
import { useGetAllReviewQuery } from "@/redux/api/reviewApi";
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
  }));

  const COLORS = ["#82ca9d", "#ffc658", "#ff7f50"]; // Approved, Pending, Rejected

  return (
    <Box sx={{ xs: 1, sm: 2, md: 4}}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        mb={4}
      >
        🐾 Pet Adoption Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", bgcolor: "#f0f8ff" }}
          >
            <Typography variant="h6">Total Pets</Typography>
            <Typography variant="h4" fontWeight="bold">
              {petDatas.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", bgcolor: "#ffe4e1" }}
          >
            <Typography variant="h6">Total Adopters</Typography>
            <Typography variant="h4" fontWeight="bold">
              {adopters?.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", bgcolor: "#e6ffe6" }}
          >
            <Typography variant="h6">Total Publishers</Typography>
            <Typography variant="h4" fontWeight="bold">
              {publisherDatas.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", bgcolor: "#ffffe0" }}
          >
            <Typography variant="h6">Admins</Typography>
            <Typography variant="h4" fontWeight="bold">
              {adminDatas.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", bgcolor: "#f9f9f9" }}
          >
            <Typography variant="h6" gutterBottom>
              Pets by Species
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={petSpeciesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="species" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", bgcolor: "#fef6e4" }}
          >
            <Typography variant="h6" gutterBottom>
              Adoption Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Approved", value: approvedAdoptions.length },
                    { name: "Pending", value: pendingAdoptions.length },
                    { name: "Rejected", value: rejectedAdoptions.length },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", bgcolor: "#e3f2fd" }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Reviews Summary
            </Typography>
            <Typography>Total Reviews: {reviews?.length || 0}</Typography>
            <Typography>
              Published Reviews:{" "}
              {reviews?.filter((r: any) => r?.isPublished).length || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
  <Paper
    elevation={3}
    sx={{ p: 3, textAlign: "center", bgcolor: "#f0f4c3" }}
  >
    <Typography variant="h6" gutterBottom>
      Review Status
    </Typography>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={reviewChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#4db6ac" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  </Paper>
</Grid>



      </Grid>
    </Box>
  );
};

export default DashboardPage;
