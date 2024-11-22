import PetModal from "@/components/Shared/PetModal/PetModal";
import { TextField } from "@mui/material";
import React, { Dispatch } from "react";
interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminModal = ({ open, setOpen }: IModalProps) => {
  return (
    <PetModal open={open} setOpen={setOpen} title="Create Admin">
      <TextField></TextField>
    </PetModal>
  );
};

export default AdminModal;
