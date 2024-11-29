"use client";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import {
  useApproveAdoptionMutation,
  useGetAdoptionRequestQuery,
  useRejectAdoptionMutation,
} from "@/redux/api/adminApi";

const ManageAdoptionPage = () => {
  const { data, isLoading } = useGetAdoptionRequestQuery({});
  const adoptions = data?.adoptionRequest;
  const [approveAdoption] = useApproveAdoptionMutation();
  const [rejectAdoption] = useRejectAdoptionMutation();
  // Handle different states
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleApprovedAdoption = async (id: string) => {
    try {
      await approveAdoption(id);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const handleRejectAdoption = async (id: string) => {
    try {
      await rejectAdoption(id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

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
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        if (row?.adoptionStatus == "PENDING") {
          return (
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Chip
                label="APPROVE"
                color="info"
                clickable
                onClick={() => handleApprovedAdoption(row?.id)}
              />
              <Chip
                label="REJECT"
                color="error"
                clickable
                onClick={() => handleRejectAdoption(row?.id)}
              />
            </Stack>
          );
        }
        if (row?.adoptionStatus == "APPROVED") {
          return <Chip label={row?.adoptionStatus} color="success" />;
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
            rows={adoptions || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            sx={{ border: 0 }}
          />
          {(!adoptions || adoptions.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No adoption found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageAdoptionPage;
