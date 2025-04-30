"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { useForm } from "react-hook-form";
import { useCreateContactMessageMutation } from "@/redux/api/contactMessageApi";

type ContactFormInputs = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

const ContactSection = () => {
  const [createContactMessage, { isLoading }] = useCreateContactMessageMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      await createContactMessage(data).unwrap();
      alert("Message sent successfully!");
      reset();
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <Container sx={{ pt: 12, pb: 8 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
        Contact Us 🐶📬
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Got a question? Want to help or adopt? We&apos;re just a message away!
      </Typography>

      {/* Contact Info */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <EmailIcon color="primary" fontSize="large" />
            <Typography variant="h6" sx={{ mt: 1 }}>Email</Typography>
            <Typography variant="body2">mohammadsakib7679@gmail.com</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <PhoneIcon color="primary" fontSize="large" />
            <Typography variant="h6" sx={{ mt: 1 }}>Phone</Typography>
            <Typography variant="body2">(+880) 01870584779</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <LocationOnIcon color="primary" fontSize="large" />
            <Typography variant="h6" sx={{ mt: 1 }}>Location</Typography>
            <Typography variant="body2">Chittagong, Bangladesh</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Contact Form */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Send us a message ✉️</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Full Name"
                fullWidth
                required
                {...register("name", { required: "Full name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Email Address"
                type="email"
                fullWidth
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                fullWidth
                {...register("subject")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Message"
                fullWidth
                multiline
                rows={4}
                required
                {...register("message", { required: "Message is required" })}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactSection;
