
"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
  AccessTime as TimeIcon,
  Chat as ChatIcon,
  CheckCircle as CheckIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useCreateContactMessageMutation } from "@/redux/api/contactMessageApi";
import { toast } from "sonner";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { useState } from "react";

interface ContactFormInputs {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  primary: string;
  secondary: string;
  color: string;
  action?: () => void;
}

const ContactSection: React.FC = () => {
  const [createContactMessage, { isLoading }] = useCreateContactMessageMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContactFormInputs>();

  const watchedFields = watch();
  const formProgress = Object.values(watchedFields).filter(value => value && value.length > 0).length / 4 * 100;

  const contactInfo: ContactInfo[] = [
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      title: "Email Us",
      primary: "mohammadsakib7679@gmail.com",
      secondary: "We'll respond within 24 hours",
      color: "#1976d2",
      action: () => window.open("mailto:mohammadsakib7679@gmail.com"),
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      title: "Call Us",
      primary: "(+880) 01870584779",
      secondary: "Mon-Fri, 9AM-6PM (GMT+6)",
      color: "#2e7d32",
      action: () => window.open("tel:+8801870584779"),
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      title: "Visit Us",
      primary: "Chittagong, Bangladesh",
      secondary: "Come meet our furry friends",
      color: "#ed6c02",
    },
  ];

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      const res = await createContactMessage(data);
      console.log(res);
      setMessageSent(true);
      setShowSuccess(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Box sx={{ 
      backgroundColor: "#f8f9fa", 
      pt: { xs: 8, md: 12 }, 
      pb: { xs: 6, md: 8 } 
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Fade triggerOnce>
            <Chip
              icon={<ChatIcon />}
              label="Get In Touch"
              variant="outlined"
              sx={{ 
                mb: 2, 
                fontSize: "0.9rem",
                fontWeight: 600,
                borderColor: "primary.main",
                color: "primary.main"
              }}
            />
          </Fade>
          
          <Fade triggerOnce delay={100}>
            <Typography 
              component="h1"
            variant="h4"
              fontWeight={700}
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2.125rem' },
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              We&apos;d Love to Hear From You
            </Typography>
          </Fade>
          
          <Fade triggerOnce delay={200}>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                mb: 4, 
                maxWidth: "600px", 
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.1rem" }
              }}
            >
              Have questions about adoption? Need help finding your perfect companion? 
              Our team is here to help you every step of the way.
            </Typography>
          </Fade>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information Cards */}
          <Grid item xs={12} lg={4}>
            <Slide direction="left" triggerOnce cascade damping={0.1}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    sx={{
                      cursor: info.action ? "pointer" : "default",
                      transition: "all 0.3s ease",
                      border: "1px solid",
                      borderColor: "grey.200",
                      "&:hover": {
                        transform: info.action ? "translateY(-4px)" : "none",
                        boxShadow: info.action ? 4 : 1,
                        borderColor: info.color,
                      },
                    }}
                    onClick={info.action}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${info.color}15`,
                            color: info.color,
                            width: 56,
                            height: 56,
                          }}
                        >
                          {info.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600} gutterBottom>
                            {info.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            fontWeight={500}
                            sx={{ mb: 0.5, color: info.color }}
                          >
                            {info.primary}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {info.secondary}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                {/* Social Media Links */}
                <Card sx={{ mt: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Follow Our Journey
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      See our rescue stories and happy adoptions
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {[
                        { icon: <FacebookIcon />, color: "#1877f2" },
                        { icon: <InstagramIcon />, color: "#E4405F" },
                        { icon: <TwitterIcon />, color: "#1DA1F2" },
                      ].map((social, index) => (
                        <IconButton
                          key={index}
                          sx={{
                            bgcolor: `${social.color}15`,
                            color: social.color,
                            "&:hover": {
                              bgcolor: social.color,
                              color: "white",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Slide>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Slide direction="right" triggerOnce>
              <Card sx={{ boxShadow: 3, border: "1px solid", borderColor: "grey.200" }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      Send us a Message
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </Typography>
                    
                    {/* Form Progress */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Form Progress:
                      </Typography>
                      <Box
                        sx={{
                          flex: 1,
                          height: 6,
                          bgcolor: "grey.200",
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            bgcolor: "primary.main",
                            borderRadius: 3,
                            width: `${formProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                      </Box>
                      <Typography variant="body2" fontWeight={600} color="primary.main">
                        {Math.round(formProgress)}%
                      </Typography>
                    </Box>
                  </Box>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Full Name"
                          fullWidth
                          required
                          variant="outlined"
                          {...register("name", { required: "Full name is required" })}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email Address"
                          type="email"
                          fullWidth
                          required
                          variant="outlined"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone Number (Optional)"
                          fullWidth
                          variant="outlined"
                          {...register("phone")}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Subject"
                          fullWidth
                          variant="outlined"
                          {...register("subject")}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          label="Your Message"
                          fullWidth
                          multiline
                          rows={4}
                          required
                          variant="outlined"
                          placeholder="Tell us how we can help you find your perfect companion..."
                          {...register("message", { required: "Message is required" })}
                          error={!!errors.message}
                          helperText={errors.message?.message}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          We typically respond within 24 hours
                        </Typography>
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        startIcon={
                          isLoading ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : messageSent ? (
                            <CheckIcon />
                          ) : (
                            <SendIcon />
                          )
                        }
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          textTransform: "none",
                          fontSize: "1rem",
                          fontWeight: 600,
                          minWidth: 140,
                          boxShadow: 2,
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 4,
                          },
                        }}
                      >
                        {isLoading ? "Sending..." : messageSent ? "Sent!" : "Send Message"}
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        </Grid>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            variant="filled"
            sx={{ borderRadius: 2, boxShadow: 3 }}
            icon={<CheckIcon />}
          >
            <Typography fontWeight={600}>Message sent successfully!</Typography>
            <Typography variant="body2">
              We&apos;ll get back to you within 24 hours. Thank you for reaching out!
            </Typography>
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContactSection;