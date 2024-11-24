import PetFile from "@/components/Forms/PetFileUploader";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import PetSelect from "@/components/Forms/PetSelect";
import PetFullScreenModal from "@/components/Shared/PetModal/PetFullScreenModal";
import AdminFullScreenModal from "@/components/Shared/PetModal/PetFullScreenModal";
import PetModal from "@/components/Shared/PetModal/PetModal";
import { optionsGender } from "@/constants/selectOptions";
import { useCreateAdminMutation } from "@/redux/api/adminApi";
import { toISODate } from "@/utils/isoFormateDate";
import { modifyPayload } from "@/utils/modifyPayload";
import { modifyPayloadWithFile } from "@/utils/modifyPlayloadWithFile";
import { createAdminValidationSchema } from "@/validation/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
  contactNumber: "",
  address: "",
  birthDate: "",
  file: "",
};
interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AdminModal = ({ open, setOpen }: IModalProps) => {
  const [createAdmin] = useCreateAdminMutation();

  const handleCreateAdmin = async (value: FieldValues) => {
    const adminData = {
      password: value.password,
      admin: {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        address: value.address,
        contactNumber: value.contactNumber,
        birthDate: toISODate(value.birthDate),
        gender: value.gender,
        file: value.file,
      },
    };

    const data = modifyPayloadWithFile(adminData);
    // console.log(data);
    try {
      const res = await createAdmin(data);

      if (res?.data?.id) {
        toast.success("Admin created successfully!");
        setOpen(false);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <PetFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create a new admin"
    >
      <PetForm
        onSubmit={handleCreateAdmin}
        // resolver={zodResolver(createAdminValidationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="First Name"
              name="firstName"
              fullWidth={true}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Last Name"
              name="lastName"
              fullWidth={true}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Email"
              name="email"
              fullWidth={true}
              type="email"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Password"
              name="password"
              fullWidth={true}
              type="password"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetSelect
              size="medium"
              name="gender"
              label="Gender"
              options={optionsGender}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              size="medium"
              label="Contact Number"
              name="contactNumber"
              fullWidth={true}
              type="tel"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              name="birthDate"
              fullWidth={true}
              type="date"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Address"
              name="address"
              fullWidth={true}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetFile name="file" label="Upload File" sx={{ py: 2 }} />
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{
            backgroundColor: "orange",
            mt: 3,
            mb: 2,
          }}
        >
          Create Admin
        </Button>
      </PetForm>
    </PetFullScreenModal>
  );
};

export default AdminModal;
