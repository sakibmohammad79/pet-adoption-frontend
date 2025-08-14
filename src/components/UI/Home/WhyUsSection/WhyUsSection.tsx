
"use client";

import { useGetAdoptionRequestQuery } from "@/redux/api/adminApi";
import { useGetAllAdopterQuery } from "@/redux/api/adopterApi";
import { useGetPetsQuery } from "@/redux/api/petApi";
import { useGetAllPublisherQuery } from "@/redux/api/publisherApi";
import { 
  Box, 
  Container, 
  Stack, 
  Typography, 
  Paper,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Chip
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Fade } from "react-awesome-reveal";
import { useState, useEffect } from "react";

const WhyUsSection = () => {
  const { data: petData } = useGetPetsQuery({});
  const { data: adoptionRequest } = useGetAdoptionRequestQuery({});
  const { data: adopterData } = useGetAllAdopterQuery({});
  const { data: petPublisher } = useGetAllPublisherQuery({});

  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);

  const pets =
    petData?.pets?.filter((pet: any) => pet.isAdopt === false && pet.isBooked === false) || [];

  const approvedAdoptions =
    adoptionRequest?.adoptionRequest?.filter(
      (item: any) => item.adoptionStatus === "APPROVED"
    ) || [];

  const adopters = adopterData || [];
  const publishers = petPublisher?.publisher || [];

  const actualValues = [pets.length, approvedAdoptions.length, adopters.length, publishers.length];

  // Animate numbers on mount
  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedValues(actualValues.map(val => Math.round(val * easeOutQuart)));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues(actualValues);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timer);
  }, [pets.length, approvedAdoptions.length, adopters.length, publishers.length]);

  const stats = [
    {
      icon: <PetsIcon sx={{ fontSize: 36 }} />,
      value: animatedValues[0],
      actualValue: actualValues[0],
      label: "Available Pets",
      subtitle: "Ready for adoption",
      color: "#667eea",
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      progress: 85,
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 36 }} />,
      value: animatedValues[1],
      actualValue: actualValues[1],
      label: "Successful Adoptions",
      subtitle: "Happy endings",
      color: "#ff4081",
      bgGradient: "linear-gradient(135deg, #ff4081 0%, #ff6ec7 100%)",
      progress: 92,
    },
    {
      icon: <EmojiPeopleIcon sx={{ fontSize: 36 }} />,
      value: animatedValues[2],
      actualValue: actualValues[2],
      label: "Happy Adopters",
      subtitle: "Satisfied families",
      color: "#4caf50",
      bgGradient: "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
      progress: 88,
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 36 }} />,
      value: animatedValues[3],
      actualValue: actualValues[3],
      label: "Trusted Publishers",
      subtitle: "Verified partners",
      color: "#ff9800",
      bgGradient: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
      progress: 95,
    },
  ];

  return (
    <Box 
      sx={{ 
        background: "#F6F3EE",
        py: { xs: 8, md: 16 },
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(102, 126, 234, 0.1)",
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255, 64, 129, 0.1)",
          filter: "blur(80px)",
        }}
      />

      <Container sx={{ position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Fade direction="down" cascade>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={2}>
              <TrendingUpIcon sx={{ color: "primary.main", fontSize: 32 }} />
              <Chip 
                label="Our Impact" 
                sx={{ 
                  bgcolor: "primary.main", 
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  px: 2
                }} 
              />
            </Stack>
            
            <Typography
              variant="h2"
              component="h1"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                lineHeight: 1.2,
                mb: 2
              }}
            >
              Connecting Hearts,
              <br />
              Creating Families
            </Typography>
            
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ 
                maxWidth: 600, 
                mx: "auto",
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                lineHeight: 1.6
              }}
            >
              Join thousands of satisfied families who found their perfect companions through our platform
            </Typography>
          </Fade>
        </Box>

        {/* Stats Grid */}
        <Fade direction="up" cascade damping={0.1}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)"
              },
              gap: { xs: 3, md: 4 },
              mb: 6
            }}
          >
            {stats.map((item, index) => (
              <Card
                key={index}
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: `0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px ${item.color}40`,
                    "& .stat-icon": {
                      transform: "rotate(10deg) scale(1.1)",
                    },
                    "& .progress-bar": {
                      transform: "scaleX(1)",
                    }
                  },
                }}
              >
                {/* Gradient top border */}
                <Box
                  sx={{
                    height: 4,
                    background: item.bgGradient,
                  }}
                />
                
                <CardContent sx={{ p: 4, textAlign: "center", position: "relative" }}>
                  {/* Icon with animated background */}
                  <Box sx={{ position: "relative", mb: 3 }}>
                    <Avatar
                      className="stat-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mb: 2,
                        background: item.bgGradient,
                        color: "white",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    
                    {/* Floating number badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: "50%",
                        transform: "translateX(50%)",
                        bgcolor: "white",
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 12px ${item.color}40`,
                        border: `2px solid ${item.color}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          color: item.color,
                        }}
                      >
                        #{index + 1}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Animated number */}
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "2.5rem", sm: "3rem" },
                      background: item.bgGradient,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 1,
                      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    {item.value.toLocaleString()}
                    {item.value < item.actualValue && (
                      <Typography component="span" sx={{ fontSize: "0.5em", opacity: 0.6 }}>
                        +
                      </Typography>
                    )}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 1,
                      fontSize: { xs: "1rem", sm: "1.1rem" }
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, fontSize: "0.9rem" }}
                  >
                    {item.subtitle}
                  </Typography>

                  {/* Progress indicator */}
                  <Box sx={{ position: "relative" }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      className="progress-bar"
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: `${item.color}20`,
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 3,
                          background: item.bgGradient,
                          transformOrigin: "left",
                          transition: "transform 1.5s ease-out 0.5s",
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: -20,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        color: item.color,
                      }}
                    >
                      {item.progress}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Fade>

        {/* Bottom CTA Section */}
        <Fade direction="up">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
              Ready to Make a Difference?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
              Join our community of pet lovers and help us create more success stories. 
              Every adoption creates a ripple of happiness that lasts a lifetime.
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default WhyUsSection;
