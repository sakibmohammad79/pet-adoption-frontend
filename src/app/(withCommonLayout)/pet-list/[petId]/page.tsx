"use client";
import { useGetSinglePetsQuery } from "@/redux/api/petApi";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const PetDetailsPage = ({ params }: any) => {
  const { data, isLoading } = useGetSinglePetsQuery(params.petId);
  if (isLoading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }
  return (
    <div>
      <h2>This is PetDetailsPage component</h2>
    </div>
  );
};

export default PetDetailsPage;
