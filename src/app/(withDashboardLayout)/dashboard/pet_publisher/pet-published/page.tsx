"use client";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import Image from "next/image";
import { useDebounced } from "@/redux/hooks";
import { useGetMyCreatredPetQuery, useGetMyPublishedPetQuery } from "@/redux/api/publisherApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";


const MyPublishPetPage = () => {

  const { data: profile, isLoading: profileLoading } = useGetMyProfileQuery({});
  const profileData = profile?.profile;


 
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }

 

  const { data, isLoading } = useGetMyPublishedPetQuery(
    profileData?.publisher?.id
  );
  const pets = data?.pets;

  

  if (profileLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

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
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Image
              src={
                row?.image ||
                "https://i.ibb.co/4JTh9dG/pexels-lina-1741205-1.jpg"
              }
              alt="profile"
              height={50}
              width={50}
            />
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "breed",
      headerName: "Breed",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "size",
      headerName: "Size",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "isPublished",
      headerName: "Published",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: () => {
          return <Chip label="Published" color="success" />;

      },
    },

  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box mt={4}>
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <Box sx={{ minWidth: "800px" }}>
        <DataGrid
          rows={pets || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20]}
          sx={{ border: 0 }}
        />
      </Box>
      {(!pets || pets.length === 0) && (
        <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
          No pets found!
        </Typography>
      )}
    </Paper>
  </Box>
  
  );
};

export default MyPublishPetPage;
