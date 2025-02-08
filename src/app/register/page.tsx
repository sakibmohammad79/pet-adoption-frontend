"use client";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import PetSelect from "@/components/Forms/PetSelect";
import { optionsGender, optionsRole } from "@/constants/selectOptions";
import { UserLogin } from "@/services/actions/loginUser";
import { AdopterRegister } from "@/services/actions/registerAdopter";
import { PublisherRegister } from "@/services/actions/registerPublisher";
import { storeUserInfo } from "@/services/auth.services";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerValidationSchema } from "@/validation/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
  gender: "",
  contactNumber: "",
  address: "",
};

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: FieldValues) => {
    setLoading(true);
    try {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        birthDate: data.birthDate,
        contactNumber: data.contactNumber,
        address: data.address,
      };

      let registerRes;
      if (data.role === "PET_ADOPTER") {
        const modifyData = modifyPayload({
          password: data.password,
          adopter: userData,
        });
        registerRes = await AdopterRegister(modifyData);
      } else if (data.role === "PET_PUBLISHER") {
        const modifyData = modifyPayload({
          password: data.password,
          publisher: userData,
        });
        registerRes = await PublisherRegister(modifyData);
      }

      if (registerRes?.data?.id) {
        const loginRes = await UserLogin({
          email: data.email,
          password: data.password,
        });
        if (loginRes?.data?.accessToken) {
          storeUserInfo(loginRes?.data?.accessToken);
          router.push("/dashboard");
        }
        toast.success(registerRes?.message);
      } else {
        toast.error(registerRes?.message);
      }
    } catch (err: any) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
              />
            </Box>
            <Box>
              <Typography fontSize={24} fontWeight="bold">
                User Registration
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <PetForm
              onSubmit={handleRegister}
              resolver={zodResolver(registerValidationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput label="First Name" name="firstName" fullWidth />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput label="Last Name" name="lastName" fullWidth />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput label="Email" name="email" fullWidth type="email" />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput
                    label="Password"
                    name="password"
                    fullWidth
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetSelect name="role" label="Role" options={optionsRole} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetSelect
                    name="gender"
                    label="Gender"
                    options={optionsGender}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput
                    label="Contact Number"
                    name="contactNumber"
                    fullWidth
                    type="tel"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput label="Address" name="address" fullWidth />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                sx={{ backgroundColor: "orange", mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Please Register"
                )}
              </Button>
            </PetForm>
            <Typography align="center">
              Already have an account? Please{" "}
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
