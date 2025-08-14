
"use client";

import { 
  Box, 
  Button, 
  Card,
  CardMedia,
  CardContent,
  Divider, 
  Rating, 
  Typography,
  Chip
} from "@mui/material";
import Link from "next/link";
import React from "react";

interface Pet {
  id: string;
  name: string;
  breed: string;
  gender: string;
  image?: string;
  isAdopt: boolean;
  isBooked: boolean;
}

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const isUnavailable = pet.isAdopt || pet.isBooked;
  const defaultImage = "https://i.ibb.co/4JTh9dG/pexels-lina-1741205-1.jpg";

  return (
    <Card
      sx={{
        maxWidth: 380,
        mx: "auto",
        position: "relative",
        overflow: "visible",
        backgroundColor: "transparent",
        boxShadow: "none",
        "&:hover .pet-image": {
          transform: "scale(1.05)",
          filter: "brightness(0.8)",
        },
        "&:hover .adoption-button": {
          opacity: 1,
          visibility: "visible",
        },
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: "relative",
          height: 400,
          backgroundColor: "#F4F1EA",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={pet?.image || defaultImage}
          alt={`${pet?.name} - pet for adoption`}
          className="pet-image"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.3s ease",
          }}
        />

        {/* Status Chip */}
        {isUnavailable && (
          <Chip
            label={pet.isAdopt ? "Adopted" : "Booked"}
            color={pet.isAdopt ? "success" : "warning"}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              fontWeight: 600,
              zIndex: 2,
            }}
          />
        )}

        {/* Adoption Button Overlay */}
        <Link href={`/pet-list/${pet.id}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            className="adoption-button"
            disabled={isUnavailable}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              visibility: "hidden",
              transition: "all 0.3s ease",
              zIndex: 10,
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: 3,
            }}
          >
            {isUnavailable ? "Not Available" : "Adopt Now"}
          </Button>
        </Link>
      </Box>

      {/* Pet Information Card */}
      <CardContent
        sx={{
          position: "relative",
          backgroundColor: "white",
          boxShadow: 2,
          borderRadius: 2,
          mt: -6,
          mx: 2,
          zIndex: 1,
          p: 3,
        }}
      >
        <Typography
          color="primary.main"
          fontWeight={700}
          variant="h5"
          component="h2"
          textAlign="center"
          textTransform="capitalize"
          sx={{ mb: 2 }}
        >
          {pet?.name}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography 
            variant="body2" 
            fontWeight={600}
            color="text.secondary"
          >
            Breed: {pet?.breed}
          </Typography>
          <Typography 
            variant="body2" 
            fontWeight={600}
            color="text.secondary"
          >
            Gender: {pet?.gender}
          </Typography>
        </Box>

        <Divider
          sx={{
            borderColor: "grey.300",
            borderStyle: "dashed",
            my: 2,
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating name="pet-rating" size="small" value={5} readOnly />
            <Typography variant="caption" color="text.secondary">
              (5.0)
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            fontWeight={600}
            color="success.main"
          >
            Adoption: Free
          </Typography>
        </Box>

        {/* Mobile Adoption Button */}
        <Box sx={{ mt: 2, display: { xs: "block", sm: "none" } }}>
          <Link href={`/pet-list/${pet.id}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isUnavailable}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              {isUnavailable ? "Not Available" : "View Details"}
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetCard;