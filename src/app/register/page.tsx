"use client";
import { AdopterRegister } from "@/services/actions/registerAdopter";
import { PublisherRegister } from "@/services/actions/registerPublisher";
import { modifyPayload } from "@/utils/modifyPayload";
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
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();
  const onSubmit: SubmitHandler<IRegisterFormData> = async (data) => {
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
        const res = await AdopterRegister(modifyData);
        console.log(res);
        if (res?.data?.id) {
          router.push("/login");
          toast.success(res?.message);
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
        const res = await PublisherRegister(modifyData);
        console.log(res);
        if (res?.data?.id) {
          router.push("/login");
          toast.success(res?.message);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="First Name*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <Typography color="error">
                      {errors.firstName.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Last Name*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <Typography color="error">
                      {errors.lastName.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Email*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <Typography color="error">
                      {errors.email.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Password*"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <Typography color="error">
                      {errors.password.message}
                    </Typography>
                  )}
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
                    <InputLabel>Gender</InputLabel>
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
