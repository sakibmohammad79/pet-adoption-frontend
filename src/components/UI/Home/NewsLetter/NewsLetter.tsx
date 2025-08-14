
"use client";

import * as React from "react";
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  InputBase,
  Alert,
  Snackbar,
  CircularProgress
} from "@mui/material";
import { 
  Email as EmailIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon
} from "@mui/icons-material";
import { Fade, Slide } from "react-awesome-reveal";

interface NewsletterState {
  email: string;
  isLoading: boolean;
  isSubscribed: boolean;
  error: string | null;
  showAlert: boolean;
}

const Newsletter: React.FC = () => {
  const [state, setState] = React.useState<NewsletterState>({
    email: "",
    isLoading: false,
    isSubscribed: false,
    error: null,
    showAlert: false,
  });

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      email: event.target.value,
      error: null,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!state.email.trim()) {
      setState(prev => ({
        ...prev,
        error: "Please enter your email address",
        showAlert: true,
      }));
      return;
    }

    if (!isValidEmail(state.email)) {
      setState(prev => ({
        ...prev,
        error: "Please enter a valid email address",
        showAlert: true,
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isSubscribed: true,
        showAlert: true,
        email: "",
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Subscription failed. Please try again.",
        showAlert: true,
      }));
    }
  };

  const handleCloseAlert = () => {
    setState(prev => ({ ...prev, showAlert: false }));
  };

  return (
    <Box sx={{ backgroundColor: "#F6F3EE", pt: {xs: 8, md: 16}, pb: { xs: 8, md: 16 } }}>
      <Container maxWidth="lg">
        <Fade triggerOnce>
          <Box
            sx={{
              background: "linear-gradient(135deg, #EE4433 0%, #CC2211 100%)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: { xs: 4, md: 6 },
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              boxShadow: "0 20px 40px rgba(238, 68, 51, 0.3)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"80\" cy=\"30\" r=\"3\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"40\" cy=\"70\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></svg>')",
                pointerEvents: "none",
              },
            }}
          >
            {/* Left Content */}
            <Box 
              textAlign={{ xs: "center", md: "left" }}
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Slide direction="left" triggerOnce>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, mb: 2 }}>
                  <EmailIcon sx={{ fontSize: 32, color: "white", mr: 1 }} />
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="white"
                    fontSize={{ xs: "1.75rem", sm: "2.25rem", md: "2.5rem" }}
                  >
                    Stay Updated
                  </Typography>
                </Box>
                
                <Typography
                  variant="h6"
                  color="white"
                  fontWeight={500}
                  sx={{ 
                    mb: 1,
                    opacity: 0.95,
                    fontSize: { xs: "1rem", sm: "1.1rem" }
                  }}
                >
                  Get the latest news about pet adoptions
                </Typography>
                
                <Typography
                  color="white"
                  sx={{ 
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    opacity: 0.8,
                    fontStyle: "italic"
                  }}
                >
                  * We respect your privacy and never spam
                </Typography>
              </Slide>
            </Box>

            {/* Email Subscription Form */}
            <Box
              sx={{ 
                position: "relative", 
                zIndex: 1,
                width: "100%",
                maxWidth: { xs: "100%", sm: 500 }
              }}
            >
              <Slide direction="right" triggerOnce>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    alignItems: "stretch",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "white",
                      borderRadius: 3,
                      px: 2,
                      py: 1,
                      flex: 1,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: state.error ? "2px solid #f44336" : "2px solid transparent",
                      transition: "all 0.3s ease",
                      "&:focus-within": {
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        border: "2px solid white",
                      },
                    }}
                  >
                    <EmailIcon sx={{ color: "grey.400", mr: 1 }} />
                    <InputBase
                      value={state.email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email address"
                      inputProps={{ 
                        "aria-label": "Email address for newsletter subscription",
                        type: "email"
                      }}
                      disabled={state.isLoading}
                      sx={{ 
                        flex: 1,
                        fontSize: { xs: "0.875rem", sm: "1rem" }
                      }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={state.isLoading || !state.email.trim()}
                    startIcon={
                      state.isLoading ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : state.isSubscribed ? (
                        <CheckIcon />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{
                      bgcolor: "white",
                      color: "#EE4433",
                      fontWeight: 600,
                      px: { xs: 4, sm: 6 },
                      py: { xs: 1.5, sm: 1.8 },
                      borderRadius: 3,
                      minWidth: { xs: "100%", sm: 140 },
                      textTransform: "none",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "grey.100",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                      },
                      "&:disabled": {
                        bgcolor: "grey.200",
                        color: "grey.500",
                        transform: "none",
                      },
                    }}
                  >
                    {state.isLoading 
                      ? "Subscribing..." 
                      : state.isSubscribed 
                      ? "Subscribed!" 
                      : "Subscribe"
                    }
                  </Button>
                </Box>
              </Slide>
            </Box>
          </Box>
        </Fade>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={state.showAlert}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={state.error ? "error" : "success"}
            variant="filled"
            sx={{ 
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            {state.error || "Successfully subscribed to our newsletter!"}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Newsletter;