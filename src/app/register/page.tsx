"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
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
const RegisterPage = () => {
  const [role, setRole] = useState("");

  const handleRoleChange = (value: any) => {
    setRole(value);
  };
  const [gender, setGender] = useState("");

  const handleGenderChange = (value: any) => {
    setGender(value);
  };

  const [birthdate, setBirthdate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    // Convert the selected date to ISO format
    const date = new Date(selectedDate);
    setBirthdate(date.toISOString());
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
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="First Name*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Last Name*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Email*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Password*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role*</InputLabel>
                    <Select
                      value={role}
                      label="Role*"
                      onChange={handleRoleChange}
                      size="small"
                    >
                      <MenuItem value="PET_PUBLISHER">PET_PUBLISHER</MenuItem>
                      <MenuItem value="FEMAPET_ADOPTERLE">PET_ADOPTER</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={gender}
                      label="Gender"
                      onChange={handleGenderChange}
                      size="small"
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
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <FormControl variant="outlined" fullWidth>
                    <TextField
                      type="date"
                      value={birthdate ? birthdate.slice(0, 10) : ""}
                      onChange={handleDateChange}
                      // label="Birthdate"
                      size="small"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
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
