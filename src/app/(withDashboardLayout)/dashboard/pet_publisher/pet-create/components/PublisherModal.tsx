import PetFile from "@/components/Forms/AutoFileUploader";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import PetSelect from "@/components/Forms/PetSelect";
import PetFullScreenModal from "@/components/Shared/PetModal/PetFullScreenModal";
import {
  optionsGender,
  optionsHealthStatus,
  optionsSize,
  optionsSpecies,
} from "@/constants/selectOptions";
import { useCreatePetMutation } from "@/redux/api/petApi";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { toast } from "sonner";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const defaultValues = {
  name: "",
  species: "",
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
  file: "",
};

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publisherId: string;
}

const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const PublisherModal = ({ open, setOpen, publisherId }: IModalProps) => {
  const { data: profile, isLoading: profileLoading } = useGetMyProfileQuery({});
  const profileData = profile?.profile;

  const [createPet] = useCreatePetMutation();
  const [loading, setLoading] = useState(false);

  const handleCreatePet = async (value: FieldValues) => {
    setLoading(true);
    try {
      const file = value.file;
      if (!file) {
        toast.error("Please upload a valid file");
        setLoading(false);
        return;
      }

      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body: formData }
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
          publisherId: profileData?.publisher?.id,
        };

        // Call API to create pet
        try {
          const res = await createPet(payload).unwrap();
          if (res?.id) {
            toast.success("Pet created successfully!");
            setOpen(false);
          }
        } catch (err: any) {
          toast.error(err?.message || "Failed to create pet");
        }
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Error occurred during creation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PetFullScreenModal open={open} setOpen={setOpen} title="Create a new pet">
      <PetForm onSubmit={handleCreatePet} defaultValues={defaultValues}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput label="Name" name="name" fullWidth size="medium" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetSelect
              size="medium"
              name="species"
              label="Species"
              options={optionsSpecies}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput label="Breed" name="breed" fullWidth size="medium" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput label="Color" name="color" fullWidth size="medium" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Age"
              name="age"
              fullWidth
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
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              size="medium"
              label="Weight"
              name="weight"
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Location"
              name="location"
              fullWidth
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Special Needs"
              name="specialNeeds"
              fullWidth
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetInput
              label="Description"
              name="description"
              fullWidth
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PetFile name="file" label="Upload File" sx={{ py: 2 }} />
          </Grid>
        </Grid>

        {/* Submit Button with Loading Indicator */}
        <Button
          type="submit"
          disabled={loading}
          sx={{
            backgroundColor: "orange",
            mt: 3,
            mb: 2,
            "&:disabled": { backgroundColor: "#ccc" },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Create New Pet"
          )}
        </Button>
      </PetForm>
    </PetFullScreenModal>
  );
};

export default PublisherModal;
