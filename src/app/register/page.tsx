"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IRegisterFormData {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  birthDate: string;
  contactNumber: string;
  address: string;
}
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();
  const onSubmit: SubmitHandler<IRegisterFormData> = (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      birthDate: data.birthDate,
      contactNumber: data.contactNumber,
      address: data.address,
    };
    const adopterData = {
      password: data.password,
      adopter: userData,
    };
    console.log(adopterData);
  };

  return (
    <Container>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
          }}
        >
          <Stack
            sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}
          >
            <Box>
              <Image
                height={80}
                width={80}
                src="https://i.postimg.cc/8cJ5XMDB/adopt-a-pet-cute-puppies-in-the-box-illustration-in-flat-style-free-vector.jpg"
                alt="Pet-icon"
              ></Image>
            </Box>
            <Box>
              <Typography fontSize={24} fontWeight="bold">
                User Registration
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="First Name*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    {...register("firstName")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Last Name*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    {...register("lastName")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Email*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    type="email"
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Password*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    type="password"
                    {...register("password")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role*</InputLabel>
                    <Select
                      label="Role*"
                      defaultValue=""
                      size="small"
                      {...register("role", { required: "Role is required" })}
                    >
                      <MenuItem value="PET_PUBLISHER">PET_PUBLISHER</MenuItem>
                      <MenuItem value="PET_ADOPTER">PET_ADOPTER</MenuItem>
                    </Select>
                    {errors.role && (
                      <Typography color="error">
                        {errors.role.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender*</InputLabel>
                    <Select
                      label="Gender*"
                      defaultValue=""
                      size="small"
                      {...register("gender")}
                    >
                      <MenuItem value="MALE">MALE</MenuItem>
                      <MenuItem value="FEMALE">FEMALE</MenuItem>
                      <MenuItem value="OTHER">OTHER</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Contact Number"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    type="tel"
                    {...register("contactNumber")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    {...register("address")}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <FormControl variant="outlined" fullWidth>
                    <TextField
                      defaultValue=""
                      type="date"
                      size="small"
                      {...register("birthDate")}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth={true}
                sx={{ backgroundColor: "orange", mt: 3, mb: 2 }}
              >
                Please Register
              </Button>
            </form>
            <Typography align="center">
              Alrady have an acount? please{" "}
              <Link href="/login">
                <Box component="span" color="orange" fontWeight="bold">
                  Login
                </Box>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
