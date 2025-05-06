"use client";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import AdminModal from "./components/AdminModal";
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

const AdminsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }
  const { data, isLoading } = useGetAdminsQuery({ ...query });
  const admins = data?.admins;
  const meta = data?.meta;
  const [deleteAdmin] = useDeleteAdminMutation();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

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
        await deleteAdmin(id).unwrap();
      } catch (err: any) {
        console.error(err);
      }
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    } else {
      Swal.fire("Cancelled", "Your item is safe :)", "info");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "profilePhoto",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (row?.profilePhoto) {
          return (
            <Box>
              <Image
                src={row?.profilePhoto}
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
              src="https://i.postimg.cc/6qRH1Y3S/profile-icon.png"
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
    },
    {
      field: "lastName",
      headerName: "Last Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
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
        return <Chip label={row?.gender} color="default" />;
      },
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "staus",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        if (row?.user) {
          return (
            <Chip
              label={row?.user?.status}
              color={row?.user.status === "ACTIVE" ? "success" : "error"}
            />
          );
        }
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
    <Stack
      // direction={{ xs: "column", sm: "row" }}
      direction={"row"}
      spacing={2}
      justifyContent={{lg: "space-between"}}
      // alignItems={{ xs: "center", sm: "stretch" }}
    >
      <Button sx={{ py: 2 }} onClick={() => setIsModalOpen(true)}>
        Create Admin
      </Button>
      <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
      <TextField
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Admin"
      
      />
    </Stack>
  
    <Box mt={4} sx={{ width: "100%", overflowX: "auto" }}>
      <Paper sx={{ minWidth: "900px" }}>
        <DataGrid
          rows={admins || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{ border: 0 }}
        />
        {(!admins || admins.length === 0) && (
          <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
            No Admin found!
          </Typography>
        )}
      </Paper>
    </Box>
  </Box>
  
  
  );
};

export default AdminsPage;
