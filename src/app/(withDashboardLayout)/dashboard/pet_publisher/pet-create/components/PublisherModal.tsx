'use client';

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { toast } from "sonner";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { FieldValues, useForm } from "react-hook-form";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";

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
  image: "",
};

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publisherId: string;
}

const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const PublisherModal = ({ open, setOpen, publisherId }: IModalProps) => {

 

  const [createPet] = useCreatePetMutation();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<FieldValues>({
    defaultValues,
    mode: "onChange",
  });

  const handleCreatePet = async (value: FieldValues) => {
    setLoading(true);
    try {
      if (!imageFile) {
        toast.error("Please upload a pet image.");
        setLoading(false);
        return;
      }

      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (data.success) {
        const imageUrl = data?.data?.url;
        const payload = {
          ...value,
          age: Number(value.age),
          height: Number(value.height),
          weight: Number(value.weight),
          image: imageUrl,
          publisherId,
        };

       await createPet(payload);

        toast.success("Pet successfully created!");
        setOpen(false);
        form.reset(defaultValues);
        setImageFile(null);
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PetFullScreenModal open={open} setOpen={setOpen} title="Publish a Pet">
      <PetForm  onSubmit={handleCreatePet}>
      <Grid container spacing={2} px={2}>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="name" label="Pet Name" fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetSelect name="species" label="Species" options={optionsSpecies} fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetSelect name="gender" label="Gender" options={optionsGender} fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="age" label="Age (years)" type="number" fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="breed" label="Breed" fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="weight" label="Weight (kg)" type="number" fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="height" label="Height (cm)" type="number" fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="color" label="Color" fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetSelect name="size" label="Size" options={optionsSize} fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetSelect name="healthStatus" label="Health Status" options={optionsHealthStatus} fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="specialNeeds" label="Special Needs" fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="location" label="Location" fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <PetInput name="description" label="Description" multiline rows={3} fullWidth size="medium" />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <AutoFileUploader
      name="file"
      label="Upload Pet Image"
      icon={<CloudUploadIcon />}
      onFileUpload={(file) => setImageFile(file)}
    />
  </Grid>
  <Grid item xs={12} textAlign={{ xs: 'center', sm: 'start' }} mt={4}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      sx={{ px: 4, py: 1.5, borderRadius: 2 }}
    >
      {loading ? <CircularProgress size={24} /> : "Publish Pet"}
    </Button>
  </Grid>
</Grid>



      </PetForm>
    </PetFullScreenModal>
  );
};

export default PublisherModal;
