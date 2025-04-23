"use client";
import React from "react";
import { Container, Typography } from "@mui/material";
import AdoptionAreaMap from "@/components/Shared/map/AdoptionAreaMap";

const AreaSection = () => {
  return (
    <Container >
      <AdoptionAreaMap></AdoptionAreaMap>
    </Container>
  );
};

export default AreaSection;
