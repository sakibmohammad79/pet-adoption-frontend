"use client";

import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ pt:16, pb: 12 }}>
      {/* Title */}
      <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
        About Our Pet Adoption Platform 🐾
      </Typography>

      {/* Intro */}
      <Typography variant="body1" sx={{ mb: 4 }}>
        Welcome to our Pet Adoption platform — a community-driven initiative dedicated to connecting loving adopters with pets who need a second chance. 
        Whether you&apos;re looking to adopt, publish, or manage adoptions, we make the process simple and transparent.
      </Typography>

      {/* Mission */}
      <Paper elevation={3} sx={{ p: 4, mb: 6, backgroundColor: "#E3F2FD" }}>
        <Typography variant="h5" gutterBottom>
          🎯 Our Mission
        </Typography>
        <Typography variant="body1">
          Our goal is to use technology to reduce pet homelessness and help adopters find their perfect companions. 
          Every animal deserves a home — and we&apos;re here to make that happen with your support.
        </Typography>
      </Paper>

      {/* How It Works */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          🔍 How It Works
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText
              primary="Adopters"
              secondary="Browse pets, book the one you love, and wait for admin approval to bring them home."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><PetsIcon /></ListItemIcon>
            <ListItemText
              primary="Publishers"
              secondary="Submit pets for adoption. After approval, they are shown publicly."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleIcon /></ListItemIcon>
            <ListItemText
              primary="Admins"
              secondary="Manage user roles, approve requests, and oversee all platform activities."
            />
          </ListItem>
        </List>
      </Box>

      {/* Features */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          ✨ Key Features
        </Typography>
        <Grid container spacing={3}>
          {[
            "Role-based registration system",
            "Secure JWT login",
            "Pet publishing & approval system",
            "Adoption request with admin approval",
            "Real-time dashboards with charts",
            "Beautiful responsive design",
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper elevation={1} sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <StarIcon color="primary" sx={{ mr: 2 }} />
                <Typography>{feature}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Final Note */}
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "#FCE4EC" }}>
        <Typography variant="h5" gutterBottom>
          🌟 A Platform With Heart
        </Typography>
        <Typography variant="body1">
          Every adoption is a new beginning. Join us in building a world where every pet is loved, and no one is left behind.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
