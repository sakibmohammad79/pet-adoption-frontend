"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import PublisherModal from "./components/PublisherModal";
import { useGetMyCreatredPetQuery } from "@/redux/api/publisherApi";
import { getUserInfo } from "@/services/auth.services";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useDeletePetMutation } from "@/redux/api/petApi";

const PetCreatePage = () => {
  const [deletePet] = useDeletePetMutation();
  const { data: profile, isLoading: profileLoading } = useGetMyProfileQuery({});
  const profileData = profile?.profile;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }

  if (profileLoading) {
    <Typography>loading...</Typography>;
  }

  const { data, isLoading } = useGetMyCreatredPetQuery(
    profileData?.publisher?.id
  );
  const pets = data?.pets;

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await deletePet(id);
      } catch (err: any) {
        console.error(err);
      }
      Swal.fire("Deleted!", "Pet has been deleted.", "success");
    } else {
      Swal.fire("Cancelled", "Pet is safe :)", "info");
    }
  };

  // Handle different states
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || pets?.length === 0) {
    return (
      <Box>
        <Typography variant="h6">No pet found!</Typography>
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
                row?.image || "https://i.postimg.cc/6qRH1Y3S/profile-icon.png"
              }
              alt="profile"
              height={30}
              width={30}
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
    },
    {
      field: "isBooked",
      headerName: "Booked",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "isAdopt",
      headerName: "Adopt",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (row.isAdopt || row.isBooked || row.isPublished) {
          return (
            <IconButton disabled aria-label="delete">
              <DeleteIcon />
            </IconButton>
          );
        }
        return (
          <IconButton onClick={() => handleDelete(row?.id)} aria-label="delete">
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          color="primary.main"
        >
          MY CREATED PET
        </Typography>
        <Button sx={{ py: 2 }} onClick={() => setIsModalOpen(true)}>
          Create New Pet
        </Button>
        <PublisherModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          publisherId={profileData?.publisher?.id}
        />
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={pets}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default PetCreatePage;