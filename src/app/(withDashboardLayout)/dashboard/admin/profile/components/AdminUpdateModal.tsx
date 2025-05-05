import PetDatePicker from "@/components/Forms/PetDatePicker";
import PetFile from "@/components/Forms/PetFileUploader";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import PetSelect from "@/components/Forms/PetSelect";
import PetFullScreenModal from "@/components/Shared/PetModal/PetFullScreenModal";
import AdminFullScreenModal from "@/components/Shared/PetModal/PetFullScreenModal";
import PetModal from "@/components/Shared/PetModal/PetModal";
import { optionsGender } from "@/constants/selectOptions";
import { useCreateAdminMutation, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { toISODate } from "@/utils/isoFormateDate";
import { modifyPayload } from "@/utils/modifyPayload";
import { modifyPayloadWithFile } from "@/utils/modifyPlayloadWithFile";
import { createAdminValidationSchema } from "@/validation/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string,
  data: any,
  refetch: () => void;
}

const AdminUpdateModal = ({ open, setOpen, id, data, refetch }: IModalProps) => {
  const [updateAdmin] = useUpdateAdminMutation();

  const handleCreateAdmin = async (value: FieldValues) => {
    const adminData = {
        id,
        data: {
        firstName: value.firstName,
        lastName: value.lastName,
        address: value.address,
        contactNumber: value.contactNumber,
        birthDate: value.birthDate,
        gender: value.gender,
        }
   
    };

 
    try {
      const res = await updateAdmin(adminData);
      if (res?.data?.id) {
        toast.success("Admin updated successfully!");
        refetch();
        setOpen(false);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const defaultValues = {
  firstName: data?.firstName,
  lastName: data?.lastName,
  gender: data?.gender,
  contactNumber:data?.contactNumber,
  address: data?.address,
  birthDate: data?.birthDate,
};

  return (
    <PetModal
      open={open}
      setOpen={setOpen}
      title="Update Your Profile"
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
            <PetDatePicker name="birthDate" fullWidth={true} size="medium" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Address"
              name="address"
              fullWidth={true}
              size="medium"
            />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4}>
            <PetFile name="file" label="Upload File" sx={{ py: 2 }} />
          </Grid> */}
        </Grid>
        <Button
          type="submit"
          sx={{
            backgroundColor: "orange",
            mt: 3,
            mb: 2,
          }}
        >
          Update Profile
        </Button>
      </PetForm>
    </PetModal>
  );
};

export default AdminUpdateModal;
