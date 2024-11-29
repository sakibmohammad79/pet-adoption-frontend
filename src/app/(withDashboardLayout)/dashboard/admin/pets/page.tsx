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
import {
  useDeletePetMutation,
  useGetPetsQuery,
  usePublishPetMutation,
  useUnpublishedPetMutation,
} from "@/redux/api/petApi";

const PetPage = () => {
  const [publishPet] = usePublishPetMutation();
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }
  const { data, isLoading } = useGetPetsQuery({ ...query });
  const pets = data?.pets;
  const [unpublishedPet] = useUnpublishedPetMutation();
  const [deletePet] = useDeletePetMutation();

  const handlePublishPet = async (id: string) => {
    try {
      const res = await publishPet(id);
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleUnpublishPet = async (id: string) => {
    try {
      const res = await unpublishedPet(id);
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };

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
        await deletePet(id).unwrap();
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
                row?.image || "https://i.postimg.cc/6qRH1Y3S/profile-icon.png"
              }
              alt="
            pet-image"
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
      field: "breed",
      headerName: "Breed",
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
      field: "isPublished",
      headerName: "Published",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        if (row?.isPublished) {
          return (
            <Chip
              disabled={row?.isAdopt || row?.isBooked ? true : false}
              label="UNPUBLISH"
              color="error"
              onClick={() => handleUnpublishPet(row?.id)}
            />
          );
        }
        if (!row?.isPublished)
          return (
            <Chip
              disabled={row?.isAdopt || row?.isBooked ? true : false}
              label="Publish"
              color="success"
              onClick={() => handlePublishPet(row?.id)}
            />
          );
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
          return <Chip label="BOOKED" color="default" />;
        }
        return <Chip label="NOT BOOK" color="default" />;
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
          return <Chip label="ADOPTED" color={"default"} />;
        }
        return <Chip label="NOT ADOPT" color="default" />;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (row.isAdopt || row.isBooked) {
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
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          component="h1"
          color="primary.main"
          fontWeight={600}
        >
          ALL PET
        </Typography>

        <TextField
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Pet"
        ></TextField>
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={pets || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
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

export default PetPage;
