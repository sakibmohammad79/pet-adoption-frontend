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
import PublisherModal from "./components/PublisherModal";
import { useGetMyCreatredPetQuery } from "@/redux/api/publisherApi";
import { getUserInfo } from "@/services/auth.services";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useDeletePetMutation } from "@/redux/api/petApi";

const PetCreatePage = () => {
  const [deletePet] = useDeletePetMutation();
  const { data: profile, isLoading: profileLoading } = useGetMyProfileQuery({});
  const profileData = profile?.profile;
  console.log(profileData, "profile data");

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
  console.log(pets);
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
      renderCell: ({ row }) => {
        if (row?.isPublished) {
          return <Chip label="Published" color="success" />;
        }
        return <Chip label="Not Publish" color="primary" />;
      },
    },

    {
      field: "isBooked",
      headerName: "Booked",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        if (row?.isBooked) {
          return <Chip label="Booked" color="success" />;
        }
        return <Chip label="Not Book" color="primary" />;
      },
    },
    {
      field: "isAdopt",
      headerName: "Adopt",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        if (row?.isAdopt) {
          return <Chip label="Adopted" color="success" />;
        }
        return <Chip label="Not Adopted" color="primary" />;
      },
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

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box mt={4}>
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <Box sx={{ minWidth: "900px" }}> {/* You can adjust minWidth as needed */}
        <DataGrid
          rows={pets || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
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

export default PetCreatePage;
