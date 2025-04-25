"use client";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import Image from "next/image";
import { useDebounced } from "@/redux/hooks";
import { useDeletePetMutation, useGetPetsQuery } from "@/redux/api/petApi";
import Link from "next/link";

const AllPetPage = () => {
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });

  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }
  const { data, isLoading } = useGetPetsQuery({ ...query });
  const pets = data?.pets;
  const publishedPets = pets?.filter((pet: any) => pet.isPublished);


  // Handle different states
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              className="pet-image"
              src={row?.image || "https://i.postimg.cc/6qRH1Y3S/profile-icon.png"}
              alt="profile"
              height={30}
              width={30}
            />
          </Box>
        );
      },
      width: 120, // Fixed width for smaller screens
      flex: 1, // Flex for larger screens
    },
    {
      field: "name",
      headerName: "Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: 150, // Fixed width for smaller screens
    },
    {
      field: "gender",
      headerName: "Gender",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: 100, // Fixed width for smaller screens
    },
    {
      field: "age",
      headerName: "Age",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: 80, // Fixed width for smaller screens
    },
    {
      field: "breed",
      headerName: "Breed",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: 100, // Fixed width for smaller screens
    },
    {
      field: "size",
      headerName: "Size",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: 100, // Fixed width for smaller screens
    },
    {
      field: "color",
      headerName: "Color",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: 100, // Fixed width for smaller screens
    },
    {
      field: "healthStatus",
      headerName: "Health Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: 120, // Fixed width for smaller screens
    },
    {
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        if (row?.isAdopt || row?.isBooked) {
          return <Chip label="Unavailable" color="error" />;
        }
        return (
          <Link href={`/pet-list/${row.id}`}>
            <Chip label="Adopt Now" color="success" />
          </Link>
        );
      },
      width: 120, // Fixed width for smaller screens
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h1" fontWeight={600} color="primary.main">
          ALL PETS
        </Typography>
        <TextField onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Pet" />
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={publishedPets || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
          {(!publishedPets || publishedPets.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No pets found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AllPetPage;
