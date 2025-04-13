"use client";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";

import { useGetMyCreatredPetQuery, useGetMyPublishedPetQuery } from "@/redux/api/publisherApi";
import { getUserInfo } from "@/services/auth.services";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useDeletePetMutation } from "@/redux/api/petApi";

const PetCreatePage = () => {

  const { data: profile, isLoading: profileLoading } = useGetMyProfileQuery({});
  const profileData = profile?.profile;
  console.log(profileData, "profile data");

 
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }

  if (profileLoading) {
    <Typography>loading...</Typography>;
  }

  const { data, isLoading } = useGetMyPublishedPetQuery(
    profileData?.publisher?.id
  );
  const pets = data?.pets;
  console.log(pets);
  

    ;

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
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          color="primary.main"
        >
          MY Published PET
        </Typography>
       
        
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
          
            rows={pets || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            // checkboxSelection
            
            sx={{ border: 0 }}
          />
          {(!pets || pets.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No pets found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default PetCreatePage;
