"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, Button, Container, Typography } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination } from "swiper/modules";

const Header = () => {
  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
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
              {" "}
              {/* Limits the text box width */}
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
                <br></br> Quas obcaecati iure quam aliquid quisquam
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
              {" "}
              {/* Limits the text box width */}
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
                <br></br> Quas obcaecati iure quam aliquid quisquam
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
              {" "}
              {/* Limits the text box width */}
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
                <br></br> Quas obcaecati iure quam aliquid quisquam
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

export default Header;
