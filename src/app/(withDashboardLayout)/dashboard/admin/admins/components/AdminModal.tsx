import PetFile from "@/components/Forms/PetFileUploader";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import PetSelect from "@/components/Forms/PetSelect";
import PetModal from "@/components/Shared/PetModal/PetModal";
import { optionsGender } from "@/constants/selectOptions";
import { toISODate } from "@/utils/isoFormateDate";
import { createAdminValidationSchema } from "@/validation/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
  contactNumber: "",
  address: "",
  birthDate: "",
};
interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleRegister = (value: FieldValues) => {
  // const isoFormateBirthDate = toISODate(value.birthDate);
  const adminData = {
    admin: {
      ...value,
      birthDate: toISODate(value.birthDate),
    },
  };
  console.log(adminData);
};

const AdminModal = ({ open, setOpen }: IModalProps) => {
  return (
    <PetModal open={open} setOpen={setOpen} title="Create a new admin">
      <PetForm
        onSubmit={handleRegister}
        // resolver={zodResolver(createAdminValidationSchema)}
        // defaultValues={defaultValues}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput label="First Name" name="firstName" fullWidth={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput label="Last Name" name="lastName" fullWidth={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput
              label="Email"
              name="email"
              fullWidth={true}
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput
              label="Password"
              name="password"
              fullWidth={true}
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetSelect name="gender" label="Gender" options={optionsGender} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput
              label="Contact Number"
              name="contactNumber"
              fullWidth={true}
              type="tel"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput name="birthDate" fullWidth={true} type="date" />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput label="Address" name="address" fullWidth={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetFile name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth={true}
          sx={{
            backgroundColor: "orange",
            mt: 3,
            mb: 2,
          }}
        >
          Create Admin
        </Button>
      </PetForm>
    </PetModal>
  );
};

export default AdminModal;
