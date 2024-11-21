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
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const handleRegister = async (data: FieldValues) => {
    console.log(data);
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      birthDate: data.birthDate,
      contactNumber: data.contactNumber,
      address: data.address,
    };

    if (data.role === "PET_ADOPTER") {
      const adopterData = {
        password: data.password,
        adopter: userData,
      };
      const modifyData = modifyPayload(adopterData);
      try {
        const registerRes = await AdopterRegister(modifyData);
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
        console.log(err.message);
      }
    }
    if (data.role === "PET_PUBLISHER") {
      const publisherData = {
        password: data.password,
        publisher: userData,
      };
      const modifyData = modifyPayload(publisherData);
      try {
        const registerRes = await PublisherRegister(modifyData);
        if (registerRes?.data?.id) {
          const loginRes = await UserLogin(data);
          if (loginRes?.data?.accessToken) {
            storeUserInfo(loginRes?.data?.accessToken);
            router.push("/dashboard");
          }
          toast.success(registerRes?.message);
        } else {
          toast.error(registerRes?.message);
        }
      } catch (err: any) {
        console.log(err.message);
      }
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
              ></Image>
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
                  <PetInput
                    label="First Name"
                    name="firstName"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput
                    label="Last Name"
                    name="lastName"
                    fullWidth={true}
                  />
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
                    fullWidth={true}
                    type="tel"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput label="Address" name="address" fullWidth={true} />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth={true}
                sx={{ backgroundColor: "orange", mt: 3, mb: 2 }}
              >
                Please Register
              </Button>
            </PetForm>
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
