import PetFile from "@/components/Forms/PetFileUploader";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import PetSelect from "@/components/Forms/PetSelect";
import PetFullScreenModal from "@/components/Shared/PetModal/PetFullScreenModal";
import {
  optionsGender,
  optionsHealthStatus,
  optionsSize,
} from "@/constants/selectOptions";
import { useCreatePetMutation } from "@/redux/api/petApi";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  image: "",
  description: "",
  gender: "",
  age: "",
  breed: "",
  weight: "",
  height: "",
  color: "",
  size: "",
  healthStatus: "",
  specialNeeds: "",
  location: "",
};
interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publisherId: string;
}
const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const PublisherModal = ({ open, setOpen, publisherId }: IModalProps) => {
  const [createPet] = useCreatePetMutation();
  const handleCreateAdmin = async (value: FieldValues) => {
    try {
      const file = value.file;
      if (!file) {
        toast.error("Please upload a valid file");
        return;
      }
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        const imageUrl = data?.data?.url;
        const { file, ...rest } = value;
        const payload = {
          ...rest,
          age: Number(value.age),
          height: Number(value.height),
          weight: Number(value.weight),
          image: imageUrl,
          publisherId,
        };
        try {
          const res = await createPet(payload).unwrap();
          if (res?.id) {
            toast.success("Pet created successfully!");
            setOpen(false);
          }
        } catch (err: any) {
          toast.error(err?.message);
        }
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Error occurred during creation");
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
            <PetInput label="Name" name="name" fullWidth={true} size="medium" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Breed"
              name="breed"
              fullWidth={true}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Color"
              name="color"
              fullWidth={true}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Age"
              name="age"
              fullWidth={true}
              type="number"
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
            <PetSelect
              size="medium"
              name="size"
              label="Size"
              options={optionsSize}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetSelect
              size="medium"
              name="healthStatus"
              label="Health Status"
              options={optionsHealthStatus}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              size="medium"
              label="Height"
              name="height"
              fullWidth={true}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              size="medium"
              label="Weight"
              name="weight"
              fullWidth={true}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Location"
              name="location"
              fullWidth={true}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Special Needs"
              name="specialNeeds"
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

export default PublisherModal;
