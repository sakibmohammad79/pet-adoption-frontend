"use client";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetMyBookedPetsQuery } from "@/redux/api/adopterApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.services";
import { Box, Chip, Paper, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";

const MyBookedPage = () => {
  const { data: profileData, isLoading: loading } = useGetMyProfileQuery({});
  const adopterId = profileData?.profile?.adopter?.id;

  const { data: myPets, isLoading } = useGetMyBookedPetsQuery(adopterId);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const pets: any = [];
  myPets?.forEach((petData: any) => {
    pets.push(petData.pet);
  });

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <Image
              className="pet-image"
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
      field: "color",
      headerName: "Color",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "healthStatus",
      headerName: "Health Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Details",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <Link href={`/pet-list/${row.id}`}>
            <Chip label="Details" color="primary" />
          </Link>
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
          fontWeight={600}
          color="primary.main"
        >
          MY BOOKED PET
        </Typography>
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={pets || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
          {(!pets || pets.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No booked pets found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MyBookedPage;
