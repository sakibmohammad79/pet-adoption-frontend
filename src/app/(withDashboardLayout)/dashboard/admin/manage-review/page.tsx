"use client";
import { Chip } from "@mui/material";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { useDeleteReviewMutation, useGetAllReviewQuery, usePublishReviewMutation, useUnpublishReviewMutation } from "@/redux/api/reviewApi";

const ManageReview = () => {
  const [id, setId] = React.useState("");

  const { data: reviews, isLoading, isError } = useGetAllReviewQuery({});
  const [publishReview] = usePublishReviewMutation();
  const [unpublishReview] = useUnpublishReviewMutation();

  const handlePublishReview = async (id: string) => {
    await publishReview(id);
  };
  const handleUnpublishReview = async (id: string) => {
    await unpublishReview(id);
  };

  const [deleteReview] = useDeleteReviewMutation();

  const handleReviewDelete = async (id: string) => {
    try {
      const res = await deleteReview(id).unwrap();
      if (res?.id) {
        toast.success("Review deleted successfully!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  if (reviews?.length < 0) {
    return (
      <Typography variant="h6" textAlign="center" mt={2}>
        No review available.
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading reviews. Please try again later.
      </Typography>
    );
  }

  const rows = reviews || [];

  const columns: GridColDef[] = [
    { field: "rating", headerName: "Rating", flex: 1 },
    { field: "comment", headerName: "Feedback", flex: 3 },
    {
      field: "isPublished",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        return row.isPublished ? (
          <Chip
            label="Unpublish"
            clickable
            color="error"
            onClick={() => handleUnpublishReview(row.id)}
          />
        ) : (
          <Chip
            label="Publish"
            clickable
            color="success"
            onClick={() => handlePublishReview(row.id)}
          />
        );
      },
    },
    { field: "createdAt", headerName: "Date", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <IconButton>
            <DeleteIcon
              onClick={() => handleReviewDelete(row?.id)}
              style={{ color: "red" }}
              fontSize="medium"
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography variant="h6" color="error" textAlign="center" mt={2}>
          Error loading review. Please try again later.
        </Typography>
      ) : rows?.length > 0 ? (
        <Box
          my={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            overflowX: "auto", 
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            sx={{
              minWidth: 600, 
            }}
          />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No review available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageReview;
