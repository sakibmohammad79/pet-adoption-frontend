'use client';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { deepPurple } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import PublisherModal from '../pet-create/components/PublisherModal';
import { useState } from 'react';
import PublisherUpdateModal from './components/PublisherUpdateModal';
import AutoFileUploader from '@/components/Forms/AutoFileUploader';
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { useUpdatePublisherMutation } from '@/redux/api/publisherApi';
import { toast } from 'sonner';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const PetPublisherProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: publisherData, isLoading, refetch } = useGetMyProfileQuery({}, { refetchOnMountOrArgChange: true });
  const profile = publisherData?.profile;

  const [updatePublisher, { isLoading: isUploading }] = useUpdatePublisherMutation();

  const fileUploadHandler = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    const imageUrl = result?.data?.url;

    if (imageUrl) {
      const profilePhotoUpdateData = {
        id: profile?.publisher?.id,
        data: {
          profilePhoto: imageUrl,
        },
      };
      await updatePublisher(profilePhotoUpdateData);
      refetch();
      toast.success('Profile picture updated successfully!');
    } else {
      toast.error('Image upload failed.');
    }
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    toast.error('Could not upload image.');
  }
};

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4">No profile data found.</Typography>
      </Box>
    );
  }

  const fullName = `${profile?.publisher?.firstName} ${profile?.publisher?.lastName}`;
  const birthDate = formatDate(profile?.publisher?.birthDate);
  const createdAt = formatDate(profile?.publisher?.createdAt);
  const updatedAt = formatDate(profile?.publisher?.updatedAt);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '90vh',
        py: 8,
        px: { xs: 3, md: 12 },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 4,
          boxShadow: 4,
          p: { xs: 4, md: 6 },
          maxWidth: '1300px',
          mx: 'auto',
        }}
      >
        <Grid container spacing={6}>
          {/* Avatar + Basic Info */}
          <Grid item xs={12} md={4} textAlign="center">
            {profile?.publisher?.profilePhoto ? (
              <Avatar
                alt={fullName}
                src={profile?.publisher?.profilePhoto}
                sx={{ width: 150, height: 150, mx: 'auto' }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: deepPurple[500],
                  fontSize: 48,
                  mx: 'auto',
                }}
              >
                {profile?.publisher?.firstName?.charAt(0).toUpperCase()}
              </Avatar>
            )}


             {isUploading ? (
            <Box
              sx={{
                mt: 2,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <AutoFileUploader
                name="file"
                label="choose your profile photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              ></AutoFileUploader>
            </Box>
          )}

            <Typography variant="h4" fontWeight={700} mt={3}>
              {fullName}
            </Typography>
            <Typography variant="h6" color="textSecondary" mt={1}>
              Role:{' '}
              <span style={{ color: '#FF6B00' }}>{profile?.role}</span>
            </Typography>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {[ 
                { label: 'Email', value: profile?.email },
                { label: 'Contact Number', value: profile?.publisher?.contactNumber },
                { label: 'Gender', value: profile?.publisher?.gender },
                { label: 'Birth Date', value: birthDate },
                { label: 'Address', value: profile?.publisher?.address },
                {
                  label: 'Account Status',
                  value: profile?.status,
                  color: profile?.status === 'ACTIVE' ? 'green' : 'red',
                },
                { label: 'Created At', value: createdAt },
                { label: 'Last Updated', value: updatedAt },
              ].map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 2,
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: 3,
                        borderColor: '#FF6B00',
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      fontWeight={600}
                      gutterBottom
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={item.color || '#1e293b'}
                    >
                      {item.value || 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Update Button */}
        <Box textAlign="center" mt={6}>
          <Button
          onClick={() => setIsModalOpen(true)}
            variant="contained"
            size="large"
            startIcon={<EditIcon />}
            sx={{
              backgroundColor: '#FF6B00',
              fontWeight: 600,
              fontSize: 16,
              px: 3,
              py: 1.4,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#e45f00',
              },
            }}
          >
            Update Profile
          </Button>
          <PublisherUpdateModal open={isModalOpen} setOpen={setIsModalOpen} id={profile?.publisher?.id}
           data={profile?.publisher}  refetch={refetch}/>
        </Box>
      </Box>
    </Box>
  );
};

export default PetPublisherProfile;
