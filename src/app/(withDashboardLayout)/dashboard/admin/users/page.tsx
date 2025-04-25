"use client";
import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({
    searchQuery: searchQuery,
    delay: 900,
  });

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
        Swal.fire("Deleted!", "Adopter has been deleted.", "success");
      }
      if (data?.role === "PET_PUBLISHER") {
        try {
          await deletePublisher(data?.publisher?.id).unwrap();
        } catch (err: any) {
          console.error(err);
        }
        Swal.fire("Deleted!", "Publisher has been deleted.", "success");
      }
    } else {
      Swal.fire("Cancelled", "Your item is safe :)", "info");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "profilePhoto",
      headerName: "Image",
      minWidth: 80,
      renderCell: ({ row }) => {
        const src =
          row?.adopter?.profilePhoto ||
          row?.publisher?.profilePhoto ||
          "https://i.postimg.cc/6qRH1Y3S/profile-icon.png";
        return (
          <Box>
            <Image src={src} alt="profile" height={30} width={30} />
          </Box>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      minWidth: 120,
      renderCell: ({ row }) => (
        <Typography>{row?.adopter?.firstName || row?.publisher?.firstName}</Typography>
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      minWidth: 120,
      renderCell: ({ row }) => (
        <Typography>{row?.adopter?.lastName || row?.publisher?.lastName}</Typography>
      ),
    },
    { field: "email", headerName: "Email", minWidth: 180 },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 100,
      renderCell: ({ row }) => (
        <Chip
          label={row?.adopter?.gender || row?.publisher?.gender}
          color="default"
        />
      ),
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip
          label={row?.role}
          color={row?.role === "PET_ADOPTER" ? "secondary" : "info"}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: ({ row }) => (
        <Chip
          label={row?.status}
          color={row?.status === "ACTIVE" ? "success" : "error"}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 80,
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleDelete(row)} aria-label="delete">
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        mb={3}
      >
        <Typography
          variant="h5"
          component="h1"
          color="primary.main"
          fontWeight={500}
        >
          ALL USERS
        </Typography>
        <TextField
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Users"
          fullWidth={isSmallScreen}
        />
      </Stack>

      {/* Scrollable container for small screens */}
      <Box sx={{ overflowX: "auto" }}>
        <Paper
          sx={{
            width: "100%",
            minWidth: isSmallScreen ? "1000px" : "auto",
          }}
        >
          <DataGrid
            rows={users || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            // checkboxSelection
            sx={{ border: 0 }}
          />
          {(!users || users.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No users found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default UserPage;
