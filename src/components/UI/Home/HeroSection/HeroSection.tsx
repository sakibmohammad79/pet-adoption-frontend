"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, Button, Container, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        "& .swiper-pagination-bullet": {
          backgroundColor: "primary.main",
        },
      }}
    >
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        loop={true}
        className="mySwiper"
        style={{ width: "100%", height: "100%" }}
      >
        {/* First Slide */}
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
              px: { xs: 2, sm: 4, md: 8 }, // Responsive padding
            }}
          >
            <Container sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                fontWeight="bold"
                variant="h3"
                color="white"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                }}
              >
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
              <Typography
                variant="body1"
                color="white"
                sx={{
                  mt: 2,
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                }}
              >
                Find your new best friend today! 🐾
                <br></br>Browse adorable pets waiting for a loving home.
              </Typography>
              <Link href={"/pet-list"}>
              <Button
              
                sx={{
                  mt: 2,
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  py: { xs: 0.5, md: 1 },
                }}
              >
                View Animals <PetsIcon sx={{ pl: 1 }} />
              </Button></Link>
            </Container>
          </Box>
        </SwiperSlide>

        {/* Repeat Slides */}
        <SwiperSlide>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              backgroundImage:
                "url('https://i.postimg.cc/y8wjck8z/pexels-jagheterjohann-1254140.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              px: { xs: 2, sm: 4, md: 8 },
            }}
          >
            <Container sx={{ textAlign: { xs: "center", md: "right" } }}>
              <Typography
                fontWeight="bold"
                variant="h3"
                color="white"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                }}
              >
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
              <Typography
                variant="body1"
                color="white"
                sx={{
                  mt: 2,
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                }}
              >
                Find your new best friend today! 🐾
                <br></br>Browse adorable pets waiting for a loving home.
              </Typography>
              <Link href={"/pet-list"}>
              <Button
              
                sx={{
                  mt: 2,
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  py: { xs: 0.5, md: 1 },
                }}
              >
                View Animals <PetsIcon sx={{ pl: 1 }} />
              </Button></Link>
            </Container>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              backgroundImage:
                "url('https://i.postimg.cc/g2QgktnP/pexels-instawally-167773.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              px: { xs: 2, sm: 4, md: 8 },
            }}
          >
            <Container sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                fontWeight="bold"
                variant="h3"
                color="white"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                }}
              >
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
              <Typography
                variant="body1"
                color="white"
                sx={{
                  mt: 2,
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                }}
              >
                Find your new best friend today! 🐾
                <br></br>Browse adorable pets waiting for a loving home.
              </Typography>
              <Link href={"/pet-list"}>
              <Button
              
                sx={{
                  mt: 2,
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  py: { xs: 0.5, md: 1 },
                }}
              >
                View Animals <PetsIcon sx={{ pl: 1 }} />
              </Button></Link>
            </Container>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default HeroSection;
