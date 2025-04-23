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

const ContactSection = () => {
  return (
    <Container  sx={{ pt: 12, pb: 8 }}>
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
            <Typography variant="h6" sx={{ mt: 1 }}>
              Email
            </Typography>
            <Typography variant="body2">support@petadopt.com</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <PhoneIcon color="primary" fontSize="large" />
            <Typography variant="h6" sx={{ mt: 1 }}>
              Phone
            </Typography>
            <Typography variant="body2">+880 1234 567 890</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <LocationOnIcon color="primary" fontSize="large" />
            <Typography variant="h6" sx={{ mt: 1 }}>
              Location
            </Typography>
            <Typography variant="body2">Chittagong, Bangladesh</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Contact Form */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Send us a message ✉️
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email Address" type="email" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Subject" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Your Message"
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactSection;

