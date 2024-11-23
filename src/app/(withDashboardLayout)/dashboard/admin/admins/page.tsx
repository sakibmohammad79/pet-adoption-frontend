"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AdminModal from "./components/AdminModal";
import { useState } from "react";
import { useGetAdminsQuery } from "@/redux/api/adminApi";

const AdminsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetAdminsQuery({});

  if (isLoading) {
    <Typography>Loaidng</Typography>;
  }
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button sx={{ py: 2 }} onClick={() => setIsModalOpen(true)}>
          Create Admin
        </Button>
        <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField placeholder="Search Admin"></TextField>
      </Stack>
      <Box>{data?.length}</Box>
    </Box>
  );
};

export default AdminsPage;
