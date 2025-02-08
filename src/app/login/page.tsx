"use client";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import { UserLogin } from "@/services/actions/loginUser";
import { storeUserInfo } from "@/services/auth.services";
import { loginValidationSchema } from "@/validation/formValidationSchema";
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
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import LoginModal from "./components/LoginModal";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await UserLogin(data);
      if (res?.data?.accessToken) {
        storeUserInfo(res?.data?.accessToken);
        router.push("/dashboard");
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error("An error occurred while logging in.");
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
                User Login
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <PetForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
              defaultValues={{ password: "", email: "" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput
                    label="Email"
                    fullWidth={true}
                    type="email"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PetInput
                    label="Password"
                    fullWidth={true}
                    type="password"
                    name="password"
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
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Please Login"
                )}
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
            <Box pt={2} display="flex" justifyContent="center">
              <Button onClick={() => setIsModalOpen(true)}>
                Demo Credentials
              </Button>
              <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
