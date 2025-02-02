"use client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { removeUser } from "@/services/auth.services";
import PetForm from "@/components/Forms/PetForm";
import PetInput from "@/components/Forms/PetInput";
import { useChangePasswordMutation } from "@/redux/api/authApi";

const PasswordChange = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();

      if (res?.success === true) {
        removeUser();
        // deleteCookies([authKey]);
        router.push("/");
        toast.success("Password Changed Successfully");
      }
      //  else {
      //   throw new Error("Incorrect Old Password");
      // }
    } catch (error: any) {
      console.log(error);
      toast.success(error?.message);
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
        mt: {
          xs: 2,
          md: 5,
        },
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Box
          sx={{
            "& svg": {
              width: 100,
              height: 100,
            },
          }}
        >
          <KeyIcon sx={{ color: "primary.main" }} />
        </Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
          Change password
        </Typography>
      </Stack>
      <PetForm
        onSubmit={onSubmit}
        //defaultValues={{ oldPassword: "", newPassword: "" }}
        // resolver={zodResolver(validationSchema)}
      >
        <Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput
              name="oldPassword"
              type="password"
              label="Old Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PetInput
              name="newPassword"
              type="password"
              label="New Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button type="submit" sx={{ width: "100%", my: 2 }}>
          change Password
        </Button>
      </PetForm>
    </Box>
  );
};

export default PasswordChange;
