"use client";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import { UserLogin } from "@/services/actions/loginUser";
import { storeUserInfo } from "@/services/auth.services";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await UserLogin(data);
      if (res?.data?.accessToken) {
        storeUserInfo(res?.data?.accessToken);
        router.push("/");
        toast.success(res?.message);
      }
    } catch (err: any) {
      console.log(err.message);
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
                User Login
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <PetForm onSubmit={handleLogin}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput
                    label="Email"
                    fullWidth={true}
                    type="email"
                    name="email"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput
                    label="Password"
                    fullWidth={true}
                    type="password"
                    name="password"
                    required={true}
                  />
                </Grid>
              </Grid>
              <Link href="/forget-password">
                <Typography align="right" mt={1}>
                  Forget Password?
                </Typography>
              </Link>
              <Button
                type="submit"
                fullWidth={true}
                sx={{ backgroundColor: "orange", mt: 3, mb: 2 }}
              >
                Please Login
              </Button>
            </PetForm>
            <Typography align="center">
              Don&apos;t have an account? please{" "}
              <Link href="/register">
                <Box component="span" color="orange" fontWeight="bold">
                  Register
                </Box>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
