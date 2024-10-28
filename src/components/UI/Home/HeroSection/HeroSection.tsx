"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, Button, Container, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

const HeroSection = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // Set the delay in milliseconds (3000ms = 3 seconds)
          disableOnInteraction: false, // Continues autoplay after interactions
        }}
        modules={[Pagination, Autoplay]} // Ensure Autoplay is included here
        loop={true} // Allows the slider to loop back to the beginning
        className="mySwiper"
        style={{ width: "100%", height: "100%" }}
      >
        <SwiperSlide>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              backgroundImage:
                "url('https://i.postimg.cc/wBwBnsyC/pexels-miami302-29110990.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Container sx={{ textAlign: "left" }}>
              <Typography fontWeight="bold" variant="h2" color="white">
                Best Friend{" "}
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "primary.main",
                    p: 1,
                    borderRadius: "5px",
                  }}
                >
                  With
                </Box>{" "}
                <br /> Happy Time
              </Typography>
              <Typography variant="h6" color="white" sx={{ mt: 2 }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                Quas obcaecati iure quam aliquid quisquam
              </Typography>
              <Button sx={{ mt: 2 }}>
                View More <PetsIcon sx={{ pl: 1 }} />
              </Button>
            </Container>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              backgroundImage:
                "url('https://i.postimg.cc/y8wjck8z/pexels-jagheterjohann-1254140.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Container sx={{ textAlign: "right" }}>
              <Typography fontWeight="bold" variant="h2" color="white">
                Best Friend{" "}
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "primary.main",
                    p: 1,
                    borderRadius: "5px",
                  }}
                >
                  With
                </Box>{" "}
                <br /> Happy Time
              </Typography>
              <Typography variant="h6" color="white" sx={{ mt: 2 }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                Quas obcaecati iure quam aliquid quisquam
              </Typography>
              <Button sx={{ mt: 2 }}>
                View More <PetsIcon sx={{ pl: 1 }} />
              </Button>
            </Container>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              backgroundImage:
                "url('https://i.postimg.cc/g2QgktnP/pexels-instawally-167773.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Container sx={{ textAlign: "left" }}>
              <Typography fontWeight="bold" variant="h2" color="white">
                Best Friend{" "}
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "primary.main",
                    p: 1,
                    borderRadius: "5px",
                  }}
                >
                  With
                </Box>{" "}
                <br /> Happy Time
              </Typography>
              <Typography variant="h6" color="white" sx={{ mt: 2 }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                Quas obcaecati iure quam aliquid quisquam
              </Typography>
              <Button sx={{ mt: 2 }}>
                View More <PetsIcon sx={{ pl: 1 }} />
              </Button>
            </Container>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default HeroSection;
