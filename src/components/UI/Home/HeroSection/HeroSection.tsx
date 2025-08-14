
"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PetsIcon from "@mui/icons-material/Pets";
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  IconButton,
  Chip,
  Stack,
  Modal,
  Backdrop,
  Fade as MuiFade
} from "@mui/material";
import { 
  PlayArrow as PlayIcon,
  Favorite as HeartIcon,
  Share as ShareIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import Link from "next/link";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";

// Animation imports
import { Fade, Slide, Zoom } from "react-awesome-reveal";

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  alignment: "left" | "center" | "right";
  cta: string;
  stats?: {
    rescued: number;
    adopted: number;
  };
}

const slidesData: SlideData[] = [
  {
    id: 1,
    image: "https://i.postimg.cc/wBwBnsyC/pexels-miami302-29110990.jpg",
    title: "Find Your Perfect",
    subtitle: "Companion",
    description: "Discover loving pets waiting for their forever homes. Every adoption saves a life and brings joy to your family.",
    alignment: "left",
    cta: "Start Your Journey",
    stats: { rescued: 1200, adopted: 800 }
  },
  {
    id: 2,
    image: "https://i.postimg.cc/y8wjck8z/pexels-jagheterjohann-1254140.jpg",
    title: "Love Knows No",
    subtitle: "Boundaries",
    description: "From playful puppies to gentle seniors, find the perfect match for your lifestyle and heart.",
    alignment: "right",
    cta: "Meet Our Pets",
    stats: { rescued: 1200, adopted: 800 }
  },
  {
    id: 3,
    image: "https://i.postimg.cc/g2QgktnP/pexels-instawally-167773.jpg",
    title: "Every Pet Deserves",
    subtitle: "A Home",
    description: "Join our mission to rescue, care for, and find loving families for pets in need.",
    alignment: "center",
    cta: "View All Animals",
    stats: { rescued: 1200, adopted: 800 }
  }
];

// YouTube Video Modal Component
const VideoModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: "rgba(0, 0, 0, 0.9)" }
      }}
    >
      <MuiFade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
            maxWidth: "1000px",
            bgcolor: "black",
            borderRadius: 3,
            outline: "none",
            overflow: "hidden",
            boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* YouTube Video Embed */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingBottom: "56.25%", // 16:9 aspect ratio
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/GUrxEdiSKos?si=NqA-Vg9Kb_O-sfaI&autoplay=1&rel=0&modestbranding=1"
              title="Pet Stories"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </Box>
        </Box>
      </MuiFade>
    </Modal>
  );
};

const SlideContent: React.FC<{ slide: SlideData; isActive: boolean; onWatchStories: () => void }> = ({ 
  slide, 
  isActive, 
  onWatchStories 
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: slide.alignment === "center" ? "center" : "flex-start",
      height: "100%",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(45deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)",
        zIndex: 1,
      }
    }}
  >
    <Container 
      sx={{ 
        textAlign: slide.alignment,
        position: "relative",
        zIndex: 2,
        py: { xs: 4, md: 8 }
      }}
    >
      {/* Stats Chips */}
      {slide.stats && (
        <Fade direction="down" triggerOnce delay={200}>
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent={slide.alignment === "center" ? "center" : slide.alignment}
            sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
          >
            <Chip
              icon={<HeartIcon sx={{ fontSize: 16 }} />}
              label={`${slide.stats.rescued}+ Rescued`}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                fontWeight: 600,
              }}
            />
            <Chip
              icon={<PetsIcon sx={{ fontSize: 16 }} />}
              label={`${slide.stats.adopted}+ Adopted`}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                fontWeight: 600,
              }}
            />
          </Stack>
        </Fade>
      )}

      {/* Main Title */}
      <Slide direction={slide.alignment === "right" ? "right" : "left"} triggerOnce>
        <Typography
          component="h1"
          variant="h2"
          sx={{
            fontWeight: 800,
            color: "white",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5rem" },
            lineHeight: { xs: 1.2, md: 1.1 },
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            mb: 1,
          }}
        >
          {slide.title}
        </Typography>
      </Slide>

      <Slide direction={slide.alignment === "right" ? "right" : "left"} triggerOnce delay={200}>
        <Typography
          component="span"
          variant="h2"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5rem" },
            lineHeight: { xs: 1.2, md: 1.1 },
            display: "block",
            mb: 3,
          }}
        >
          {slide.subtitle}
        </Typography>
      </Slide>

      {/* Description */}
      <Fade triggerOnce delay={400}>
        <Typography
          variant="h6"
          color="white"
          sx={{
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            maxWidth: { xs: "100%", md: "600px" },
            mx: slide.alignment === "center" ? "auto" : 0,
            mr: slide.alignment === "right" ? 0 : "auto",
            ml: slide.alignment === "left" ? 0 : "auto",
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
            lineHeight: 1.6,
            opacity: 0.95,
          }}
        >
          {slide.description}
        </Typography>
      </Fade>

      {/* Action Buttons */}
      <Zoom triggerOnce delay={600}>
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2}
          justifyContent={slide.alignment === "center" ? "center" : slide.alignment}
          alignItems="center"
        >
          <Link href="/pet-list" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<PetsIcon />}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 700,
                borderRadius: 3,
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                minWidth: { xs: "200px", sm: "auto" },
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
                  bgcolor: "primary.dark",
                },
              }}
            >
              {slide.cta}
            </Button>
          </Link>

          <Button
            variant="outlined"
            startIcon={<PlayIcon />}
            onClick={onWatchStories}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              px: 3,
              py: 1.5,
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 600,
              borderRadius: 3,
              textTransform: "none",
              backdropFilter: "blur(10px)",
              minWidth: { xs: "200px", sm: "auto" },
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
                borderColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(255,255,255,0.2)",
              },
            }}
          >
            Watch Stories
          </Button>
        </Stack>
      </Zoom>

      {/* Social Actions */}
      <Fade triggerOnce delay={800}>
        <Stack 
          direction="row" 
          spacing={1}
          justifyContent={slide.alignment === "center" ? "center" : slide.alignment}
          sx={{ mt: 4 }}
        >
          <IconButton
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                transform: "scale(1.1)",
              },
            }}
          >
            <HeartIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                transform: "scale(1.1)",
              },
            }}
          >
            <ShareIcon />
          </IconButton>
        </Stack>
      </Fade>
    </Container>
  </Box>
);

const HeroSection: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleWatchStories = () => {
    setVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          "& .swiper": {
            width: "100%",
            height: "100%",
          },
          "& .swiper-pagination": {
            bottom: "30px !important",
            zIndex: 10,
          },
          "& .swiper-pagination-bullet": {
            width: "12px",
            height: "12px",
            backgroundColor: "rgba(255,255,255,0.5)",
            opacity: 1,
            transition: "all 0.3s ease",
            "&.swiper-pagination-bullet-active": {
              backgroundColor: "white",
              transform: "scale(1.2)",
            },
          },
          "& .swiper-button-next, & .swiper-button-prev": {
            color: "white",
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            transition: "all 0.3s ease",
            "&:after": {
              fontSize: "20px",
              fontWeight: "bold",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
              transform: "scale(1.1)",
            },
          },
        }}
      >
        <Swiper
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay, EffectFade, Navigation]}
          loop={true}
          speed={1000}
          className="hero-swiper"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  height: "100%",
                  backgroundImage: `url('${slide.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  position: "relative",
                }}
              >
                <SlideContent 
                  slide={slide} 
                  isActive={true} 
                  onWatchStories={handleWatchStories}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: { xs: "none", md: "block" },
          }}
        >
          <Fade triggerOnce delay={1000}>
            <Box
              sx={{
                width: "2px",
                height: "40px",
                bgcolor: "rgba(255,255,255,0.7)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-1px",
                  width: "4px",
                  height: "20px",
                  bgcolor: "white",
                  animation: "scroll 2s infinite",
                },
                "@keyframes scroll": {
                  "0%": { transform: "translateY(0)", opacity: 0 },
                  "50%": { opacity: 1 },
                  "100%": { transform: "translateY(20px)", opacity: 0 },
                },
              }}
            />
          </Fade>
        </Box>
      </Box>

      {/* YouTube Video Modal */}
      <VideoModal 
        open={videoModalOpen} 
        onClose={handleCloseVideo} 
      />
    </>
  );
};

export default HeroSection;