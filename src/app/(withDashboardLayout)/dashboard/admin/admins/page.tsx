"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import AdminModal from "./components/AdminModal";
import { useState } from "react";
import { useGetAdminsQuery } from "@/redux/api/adminApi";

const columns: GridColDef[] = [
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
];

const AdminsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useGetAdminsQuery({});

  // Handle different states
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box>
        <Typography variant="h6">No admins found!</Typography>
      </Box>
    );
  }
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button sx={{ py: 2 }} onClick={() => setIsModalOpen(true)}>
          Create Admin
        </Button>
        <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField placeholder="Search Admin"></TextField>
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminsPage;
