"use client";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "@/redux/api/adminApi";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { useDeleteAdopterMutation } from "@/redux/api/adopterApi";
import { useDeletePublisherMutation } from "@/redux/api/publisherApi";

const UserPage = () => {
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }
  const { data, isLoading } = useGetUsersQuery({ ...query });
  const users = data?.users;
  const [deleteAdopter] = useDeleteAdopterMutation();
  const [deletePublisher] = useDeletePublisherMutation();

  const handleDelete = async (data: any) => {
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
      if (data?.role === "PET_ADOPTER") {
        try {
          await deleteAdopter(data?.adopter?.id).unwrap();
        } catch (err: any) {
          console.error(err);
        }

        Swal.fire("Deleted!", "Adopter, has been deleted.", "success");
      }
      if (data?.role === "PET_PUBLISHER") {
        try {
          await deletePublisher(data?.publisher?.id).unwrap();
        } catch (err: any) {
          console.error(err);
        }
        Swal.fire("Deleted!", "Publisher, has been deleted.", "success");
      }
    } else {
      Swal.fire("Cancelled", "Your item is safe :)", "info");
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
      field: "profilePhoto",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (row?.adopter) {
          return (
            <Box>
              <Image
                src={
                  row?.adoopter?.profilePhoto ||
                  "https://i.postimg.cc/6qRH1Y3S/profile-icon.png"
                }
                alt="profile"
                height={30}
                width={30}
              />
            </Box>
          );
        }
        return (
          <Box>
            <Image
              src={
                row?.publisher?.profilePhoto ||
                "https://i.postimg.cc/6qRH1Y3S/profile-icon.png"
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
      field: "firstName",
      headerName: "First Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        if (row?.adopter) {
          return (
            <Box>
              <Typography>{row?.adopter?.firstName}</Typography>
            </Box>
          );
        }
        return (
          <Box>
            <Typography>{row?.publisher?.firstName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "lastName",
      headerName: "Last Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        if (row?.adopter) {
          return (
            <Box>
              <Typography>{row?.adopter?.lastName}</Typography>
            </Box>
          );
        }
        return (
          <Box>
            <Typography>{row?.publisher?.lastName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
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
      renderCell: ({ row }) => {
        return (
          <Chip
            label={
              row?.role === "PET_ADOPTER"
                ? row?.adopter?.gender
                : row?.publisher?.gender
            }
            color="default"
          />
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Chip
            label={row?.role}
            color={row?.role === "PET_ADOPTER" ? "secondary" : "info"}
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Chip
            label={row?.status}
            color={row?.status === "ACTIVE" ? "success" : "error"}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row)} aria-label="delete">
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
          fontWeight={400}
        >
          ALL USERS:{" "}
        </Typography>
        <TextField
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Users"
        ></TextField>
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={users || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            sx={{ border: 0 }}
          />
          {(!users || users.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No pets found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default UserPage;
