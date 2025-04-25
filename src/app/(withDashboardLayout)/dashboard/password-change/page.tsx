"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "sonner";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { removeUser } from "@/services/auth.services";
import PetInput from "@/components/Forms/PetInput";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import PetForm from "@/components/Forms/PetForm";

const PasswordChange = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { reset } = useForm();

  const onSubmit = async (values: FieldValues) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("New Password and Confirm Password do not match!");
      return;
    }
    try {
      const res = await changePassword(values).unwrap();

      if (res?.success === true) {
        removeUser();
        router.push("/");
        toast.success(res?.message);
        reset(); // Reset the form values only on success
      } else {
        toast.error("Old password is incorrect!");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 600,
        width: "100%",
        boxShadow: 1,
        borderRadius: 1,
        mx: "auto",
        mt: { xs: 2, md: 5 },
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Box sx={{ "& svg": { width: 100, height: 100 } }}>
          <KeyIcon sx={{ color: "primary.main" }} />
        </Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
          Change Password
        </Typography>
      </Stack>
      <PetForm
        onSubmit={onSubmit}
        defaultValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PetInput
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              label="Old Password"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <PetInput
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              label="New Password"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <PetInput
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Re-Type New Password"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Button type="submit" sx={{ width: "100%", my: 2 }}>
          Change Password
        </Button>
      </PetForm>
    </Box>
  );
};

export default PasswordChange;
