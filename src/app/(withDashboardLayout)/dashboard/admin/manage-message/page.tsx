"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { DeleteOutline, EmailOutlined } from "@mui/icons-material";
import {
  useDeleteMessageMutation,
  useGetAllContactMessageQuery,
} from "@/redux/api/contactMessageApi";
import dayjs from "dayjs";
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2";



const ContactMessage = () => {
  const { data, isLoading, refetch } = useGetAllContactMessageQuery({});
  const [deleteMessage] = useDeleteMessageMutation();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteMessage(id);
        refetch();

        Swal.fire({
          title: "Deleted!",
          text: "The message has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete message:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting the message.",
          icon: "error",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Contact Messages
      </Typography>
      <Grid container spacing={3}>
        {data?.map((message: any) => (
          <Grid item key={message.id} xs={12} sm={12} md={6}  lg={4}>
            <Fade triggerOnce direction="up">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  p: 2,
                  borderRadius: 4,
                  boxShadow: 6,
                  backgroundColor: "#f9f9fb",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      {message.name}
                    </Typography>
                    <IconButton
                      onClick={() => handleDelete(message.id)}
                      color="error"
                      aria-label="delete"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>

                  <Typography variant="body1" gutterBottom>
                    📧 <strong>Email:</strong> {message.email}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.primary"
                    mt={1.5}
                    sx={{
                      whiteSpace: "pre-wrap",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      backgroundColor: "#fff",
                      p: 1.5,
                      borderRadius: 2,
                      boxShadow: 1,
                      border: "1px solid #e0e0e0",
                      minHeight: "80px",
                    }}
                  >
                    📝 <strong>Message:</strong> {message.message}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="body1" color="text.secondary" mb={0.5}>
                      🕒 <strong>Time:</strong>{" "}
                      {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
                    </Typography>
                    
                  </Box>

                  <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
  <Button
    variant="outlined"
    color="primary"
    size="small"
    startIcon={<EmailOutlined />}
    target="_blank"
    rel="noopener noreferrer"
    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${message.email}&su=Reply to your message`}
  >
    Send Email
  </Button>
</Box>

                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ContactMessage;
