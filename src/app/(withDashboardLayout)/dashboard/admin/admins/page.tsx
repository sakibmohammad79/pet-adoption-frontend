"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import AdminModal from "./components/AdminModal";
import { useState } from "react";

const AdminsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create Admin</Button>
        <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField placeholder="Search Admin" size="small"></TextField>
      </Stack>
    </Box>
  );
};

export default AdminsPage;
