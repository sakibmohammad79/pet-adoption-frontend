import { Box, Button, Divider, Rating, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PetCard = ({ pet }: { pet: any }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F4F1EA",
        height: 400,
        width: 380,
        mb: 8,
        position: "relative",
        mx: "auto", // Centers the image box horizontally
        "&:hover .adoption-button": {
          display: "block", // Show button on hover
        },
        "&:hover img": {
          opacity: 0.6, // Lower opacity on hover
          transform: "scale(1.05)", // Slightly scale the image
          transition: "transform 0.3s ease, opacity 0.3s ease", // Smooth transition
        },
      }}
    >
      <Image
        height={400}
        width={380}
        src={
          pet?.image ||
          "https://i.postimg.cc/8k016xsJ/pexels-kevinbidwell-1398185.jpg"
        }
        alt="pet-image"
        style={{
          transition: "opacity 0.3s ease", // Smooth transition for opacity
        }}
      />

      <Box
        sx={{
          position: "absolute",
          backgroundColor: "white",
          boxShadow: 1,
          p: 2,
          bottom: -80,
          left: "50%", // Move to center
          transform: "translateX(-50%)", // Center horizontally
          width: 320,
        }}
      >
        <Typography
          color="primary.main"
          fontWeight={600}
          variant="h5"
          component="h1"
          textAlign="center"
          textTransform="capitalize"
        >
          {pet?.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontSize={14} fontWeight={600}>
            {pet?.breed}
          </Typography>
          <Typography fontSize={14} fontWeight={600}>
            Gender: {pet?.gender}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", textAlign: "center", my: 2 }}>
          <Divider
            sx={{
              borderColor: "gray",
              borderStyle: "dashed",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Rating name="read-only" size="small" value={5} readOnly />
          <Typography fontSize={14} fontWeight={600}>
            Total Price: Free
          </Typography>
        </Box>
      </Box>

      {/* Adoption Button */}
      <Link href={`/pet-list/${pet.id}`}>
        <Button
          variant="contained"
          color="primary"
          className="adoption-button"
          sx={{
            position: "absolute",
            top: "50%", // Center vertically
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)", // Adjust to center
            display: "none", // Hide button by default
            zIndex: 10, // Ensure the button is above other elements
          }}
        >
          Adopt Now
        </Button>
      </Link>
    </Box>
  );
};

export default PetCard;
