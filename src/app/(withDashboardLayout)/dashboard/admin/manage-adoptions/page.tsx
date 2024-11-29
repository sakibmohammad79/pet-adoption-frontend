"use client";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetAdoptionRequestQuery } from "@/redux/api/adminApi";

const ManageAdoptionPage = () => {
  const { data, isLoading } = useGetAdoptionRequestQuery({});
  const adoptions = data?.adoptionRequest;
  // Handle different states
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!adoptions || adoptions?.length === 0) {
    return (
      <Box>
        <Typography variant="h6">No Adoption Request!</Typography>
      </Box>
    );
  }

  const handleAdoption = () => {};

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Adotion ID",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "petId",
      headerName: "Pet ID",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "adopterId",
      headerName: "Adopter ID",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },

    {
      field: "adoptionDate",
      headerName: "Adoption Date",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "adoptionStatus",
      headerName: "adoption Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        if (row?.adoptionStatus == "PENDING") {
          return <Chip label={row?.adoptionStatus} color="secondary" />;
        } else if (row?.adoptionStatus == "APPROVED") {
          return <Chip label={row?.adoptionStatus} color="success" />;
        }
        return <Chip label={row?.adoptionStatus} color="error" />;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (row?.adoptionStatus == "PENDING") {
          return (
            <Stack direction="row" spacing={1}>
              <Chip
                label="APPROVED"
                color="secondary"
                clickable
                onClick={() => handleAdoption}
              />
              <Chip
                label="REJECT"
                color="error"
                clickable
                onClick={() => handleAdoption}
              />
            </Stack>
          );
        }
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
          ALL Adoption Request
        </Typography>
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={adoptions}
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

export default ManageAdoptionPage;
