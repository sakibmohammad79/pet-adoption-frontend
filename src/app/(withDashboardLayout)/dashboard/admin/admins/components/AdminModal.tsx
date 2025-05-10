import PetDatePicker from "@/components/Forms/PetDatePicker";
import PetFile from "@/components/Forms/PetFile";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import PetSelect from "@/components/Forms/PetSelect";
import PetFullScreenModal from "@/components/Shared/PetModal/PetFullScreenModal";
import { optionsGender } from "@/constants/selectOptions";
import { useCreateAdminMutation } from "@/redux/api/adminApi";
import { modifyPayloadWithFile } from "@/utils/modifyPlayloadWithFile";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async (value: FieldValues) => {
    const adminData = {
      password: value.password,
      admin: {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        address: value.address,
        contactNumber: value.contactNumber,
        birthDate: value.birthDate,
        gender: value.gender,
        file: value.file,
      },
    };

    const data = modifyPayloadWithFile(adminData);

    setLoading(true);
    try {
      const res = await createAdmin(data).unwrap();
      if (res?.id) {
        toast.success(" Admin created successfully!");
        setOpen(false);
      } else {
        toast.error(" Something went wrong!");
      }
    } catch (err: any) {
      toast.error(` Failed to create admin: ${err?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PetFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create a new admin"
    >
      <PetForm onSubmit={handleCreateAdmin} defaultValues={defaultValues}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="First Name"
              name="firstName"
              fullWidth
              size="medium"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Last Name"
              name="lastName"
              fullWidth
              size="medium"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Email"
              name="email"
              fullWidth
              type="email"
              size="medium"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Password"
              name="password"
              fullWidth
              type="password"
              size="medium"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetSelect
              size="medium"
              name="gender"
              label="Gender"
              options={optionsGender}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              size="medium"
              label="Contact Number"
              name="contactNumber"
              fullWidth
              type="tel"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetDatePicker
              name="birthDate"
              fullWidth
              size="medium"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Address"
              name="address"
              fullWidth
              size="medium"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetFile name="file" label="Upload File" required={true} />
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{ backgroundColor: "orange", mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Admin"}
        </Button>
      </PetForm>
    </PetFullScreenModal>
  );
};

export default AdminModal;
